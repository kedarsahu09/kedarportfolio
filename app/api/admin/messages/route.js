import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { listMessages, setMessageStatus, deleteMessage } from '@/lib/store';

const unauthorized = () => NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

export async function GET() {
  if (!isAdmin()) return unauthorized();
  return NextResponse.json({ messages: await listMessages() });
}

export async function PATCH(req) {
  if (!isAdmin()) return unauthorized();
  const { id, status } = await req.json().catch(() => ({}));
  if (!id || !['read', 'unread'].includes(status)) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  const m = await setMessageStatus(id, status);
  if (!m) return NextResponse.json({ error: 'Message not found.' }, { status: 404 });
  return NextResponse.json({ ok: true, message: m });
}

export async function DELETE(req) {
  if (!isAdmin()) return unauthorized();
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id.' }, { status: 400 });
  await deleteMessage(id);
  return NextResponse.json({ ok: true });
}
