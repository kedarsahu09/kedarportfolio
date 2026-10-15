import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { addComment, getPost, rateLimit } from '@/lib/store';
import { clientIp } from '@/lib/auth';

const clean = (s, max) => String(s ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);

export async function POST(req) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  // Honeypot: bots fill the hidden field. Pretend success and drop it.
  if (body.website) return NextResponse.json({ ok: true });

  const ip = clientIp(req);
  if (!(await rateLimit(`comment:${ip}`, 5, 3600))) {
    return NextResponse.json({ error: 'Too many comments from your connection. Please try again later.' }, { status: 429 });
  }

  const name = clean(body.name, 60);
  const email = clean(body.email, 120);
  const message = clean(body.message, 1000);
  const slug = clean(body.slug, 80);

  if (!name) return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  if (message.length < 3) return NextResponse.json({ error: 'Your comment is too short.' }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address or leave it blank.' }, { status: 400 });
  }
  if (slug !== 'general') {
    const post = await getPost(slug);
    if (!post || post.status !== 'published') return NextResponse.json({ error: 'This post is not accepting comments.' }, { status: 404 });
  }

  await addComment({
    id: crypto.randomUUID(),
    slug,
    name,
    email,
    message,
    status: 'pending',
    createdAt: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true });
}
