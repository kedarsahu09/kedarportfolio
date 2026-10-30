import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { addComment, getPost, rateLimit } from '@/lib/store';
import { clientIp } from '@/lib/auth';
import { notifyOwner } from '@/lib/notify';

const clean = (s, max) => String(s ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHOTO_RE = /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/;
const LINKEDIN_RE = /^https?:\/\/([a-z0-9-]+\.)?linkedin\.com\/[^\s]*$/i;

export async function POST(req) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  // Honeypot: bots fill the hidden field. Pretend success and drop it.
  if (body.website) return NextResponse.json({ ok: true });

  if (!(await rateLimit(`comment:${clientIp(req)}`, 5, 3600))) {
    return NextResponse.json({ error: 'Too many submissions from your connection. Please try again later.' }, { status: 429 });
  }

  const name = clean(body.name, 60);
  const email = clean(body.email, 120);
  const message = clean(body.message, 1000);
  const slug = clean(body.slug, 80);
  const isTestimonial = slug === 'general'; // home-page "What people say"

  if (!name) return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  if (message.length < 3) return NextResponse.json({ error: 'Your message is too short.' }, { status: 400 });
  if (email && !EMAIL_RE.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });

  const record = {
    id: crypto.randomUUID(),
    slug,
    name,
    email,
    message,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  if (isTestimonial) {
    if (!email) return NextResponse.json({ error: 'Please enter your email. It stays private.' }, { status: 400 });
    record.role = clean(body.role, 60);
    record.company = clean(body.company, 60);
    const rating = Math.round(Number(body.rating));
    record.rating = rating >= 1 && rating <= 5 ? rating : 0;

    let linkedin = clean(body.linkedin, 200);
    if (linkedin && !/^https?:\/\//i.test(linkedin)) linkedin = `https://${linkedin}`;
    if (linkedin && !LINKEDIN_RE.test(linkedin)) return NextResponse.json({ error: 'Please enter a valid LinkedIn URL or leave it blank.' }, { status: 400 });
    record.linkedin = linkedin;

    if (body.photo) {
      if (typeof body.photo !== 'string' || body.photo.length > 70000 || !PHOTO_RE.test(body.photo)) {
        return NextResponse.json({ error: 'That photo could not be used. Try a smaller image.' }, { status: 400 });
      }
      record.photo = body.photo;
    }
  } else {
    const post = await getPost(slug);
    if (!post || post.status !== 'published') return NextResponse.json({ error: 'This post is not accepting comments.' }, { status: 404 });
  }

  await addComment(record);

  await notifyOwner({
    subject: `New ${isTestimonial ? 'testimonial' : 'comment'} awaiting review from ${name}`,
    text: `${isTestimonial ? 'Testimonial' : `Comment on /blog/${slug}`} from ${name}${record.role || record.company ? ` (${[record.role, record.company].filter(Boolean).join(', ')})` : ''}${record.rating ? `\nRating: ${record.rating}/5` : ''}\n\n${message}\n\nIt is NOT public until you approve it.`,
    replyTo: email || undefined,
  });

  return NextResponse.json({ ok: true });
}
