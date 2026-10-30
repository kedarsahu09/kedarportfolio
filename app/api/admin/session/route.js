import { NextResponse } from 'next/server';
import { checkPassword, makeToken, cookieOptions, COOKIE_NAME, clientIp } from '@/lib/auth';
import { rateLimit } from '@/lib/store';

export async function POST(req) {
  const ip = clientIp(req);
  if (!(await rateLimit(`login:${ip}`, 10, 900))) {
    return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 });
  }
  const body = await req.json().catch(() => ({}));
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'ADMIN_PASSWORD is not set on the server.' }, { status: 500 });
  }
  if (!checkPassword(body.password)) {
    return NextResponse.json({ error: 'Wrong password.' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, makeToken(), cookieOptions);
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, '', { ...cookieOptions, maxAge: 0 });
  return res;
}
