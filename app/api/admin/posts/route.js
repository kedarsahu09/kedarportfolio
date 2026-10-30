import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAdmin } from '@/lib/auth';
import { listPosts, getPost, savePost, deletePost } from '@/lib/store';
import { slugify, RESERVED_SLUGS } from '@/lib/util';

const unauthorized = () => NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
const bad = (error, status = 400) => NextResponse.json({ error }, { status });
const refresh = () => revalidatePath('/', 'layout');

function validate(b) {
  if (!b || typeof b !== 'object') return { error: 'Invalid request.' };
  const title = String(b.title || '').trim().slice(0, 140);
  const slug = slugify(b.slug || title);
  const content = String(b.content || '').slice(0, 100000);
  const status = b.status === 'published' ? 'published' : 'draft';
  if (!title) return { error: 'Title is required.' };
  if (!slug) return { error: 'Slug is required.' };
  if (RESERVED_SLUGS.includes(slug)) return { error: `"${slug}" is a reserved slug. Choose another.` };
  if (!content.trim()) return { error: 'Content is required.' };
  const tags = (Array.isArray(b.tags) ? b.tags : String(b.tags || '').split(','))
    .map((t) => String(t).trim().slice(0, 24)).filter(Boolean).slice(0, 6);
  let excerpt = String(b.excerpt || '').trim().slice(0, 300);
  if (!excerpt) excerpt = content.replace(/[#*_`>\[\]()!-]/g, '').replace(/\s+/g, ' ').trim().slice(0, 160);
  return { post: { slug, title, excerpt, tags, content, status } };
}

export async function GET() {
  if (!isAdmin()) return unauthorized();
  return NextResponse.json({ posts: await listPosts() });
}

export async function POST(req) {
  if (!isAdmin()) return unauthorized();
  const v = validate(await req.json().catch(() => null));
  if (v.error) return bad(v.error);
  if (await getPost(v.post.slug)) return bad('A post with this slug already exists.', 409);
  const now = new Date().toISOString();
  const post = { ...v.post, createdAt: now, updatedAt: now, publishedAt: v.post.status === 'published' ? now : null };
  await savePost(post);
  refresh();
  return NextResponse.json({ ok: true, post });
}

export async function PUT(req) {
  if (!isAdmin()) return unauthorized();
  const v = validate(await req.json().catch(() => null));
  if (v.error) return bad(v.error);
  const existing = await getPost(v.post.slug);
  if (!existing) return bad('Post not found.', 404);
  const now = new Date().toISOString();
  const post = {
    ...existing,
    ...v.post,
    updatedAt: now,
    publishedAt: v.post.status === 'published' ? existing.publishedAt || now : existing.publishedAt || null,
  };
  await savePost(post);
  refresh();
  return NextResponse.json({ ok: true, post });
}

export async function DELETE(req) {
  if (!isAdmin()) return unauthorized();
  const slug = new URL(req.url).searchParams.get('slug');
  if (!slug) return bad('Missing slug.');
  await deletePost(slug);
  refresh();
  return NextResponse.json({ ok: true });
}
