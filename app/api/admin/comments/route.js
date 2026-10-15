import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAdmin } from '@/lib/auth';
import { listComments, setCommentStatus, deleteComment } from '@/lib/store';

const unauthorized = () => NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
const refresh = () => revalidatePath('/', 'layout');

export async function GET() {
  if (!isAdmin()) return unauthorized();
  return NextResponse.json({ comments: await listComments() });
}

export async function PATCH(req) {
  if (!isAdmin()) return unauthorized();
  const { id, status } = await req.json().catch(() => ({}));
  if (!id || !['approved', 'pending'].includes(status)) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  const c = await setCommentStatus(id, status);
  if (!c) return NextResponse.json({ error: 'Comment not found.' }, { status: 404 });
  refresh();
  return NextResponse.json({ ok: true, comment: c });
}

export async function DELETE(req) {
  if (!isAdmin()) return unauthorized();
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id.' }, { status: 400 });
  await deleteComment(id);
  refresh();
  return NextResponse.json({ ok: true });
}
