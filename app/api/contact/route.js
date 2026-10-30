import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { addMessage, rateLimit } from '@/lib/store';
import { clientIp } from '@/lib/auth';
import { notifyOwner } from '@/lib/notify';

const clean = (s, max) => String(s ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);

export async function POST(req) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  // Honeypot: bots fill the hidden field. Pretend success and drop it.
  if (body.website) return NextResponse.json({ ok: true });

  if (!(await rateLimit(`contact:${clientIp(req)}`, 5, 3600))) {
    return NextResponse.json({ error: 'Too many messages from your connection. Please try again later.' }, { status: 429 });
  }

  const name = clean(body.name, 80);
  const email = clean(body.email, 120);
  const subject = clean(body.subject, 120);
  const message = clean(body.message, 3000);

  if (!name) return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  if (message.length < 5) return NextResponse.json({ error: 'Please write a short message.' }, { status: 400 });

  const record = {
    id: crypto.randomUUID(),
    name,
    email,
    subject,
    message,
    status: 'unread',
    createdAt: new Date().toISOString(),
  };
  await addMessage(record);

  await notifyOwner({
    subject: `Portfolio message: ${subject || `from ${name}`}`,
    text: `From: ${name} <${email}>\nSubject: ${subject || '(none)'}\n\n${message}`,
    replyTo: email,
  });

  return NextResponse.json({ ok: true });
}
