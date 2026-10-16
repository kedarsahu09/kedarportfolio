import { profile } from '@/content/site';

/**
 * Sends YOU an email when someone contacts you or leaves a testimonial.
 * Uses Resend (https://resend.com, free plan). If RESEND_API_KEY is not set,
 * nothing is sent and the site keeps working: messages still reach /admin.
 * This function never throws, so a mail problem can never break a form.
 */
export const emailConfigured = () => Boolean(process.env.RESEND_API_KEY);

const oneLine = (s) => String(s || '').replace(/[\r\n]+/g, ' ').slice(0, 150);

export async function notifyOwner({ subject, text, replyTo }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false, reason: 'not-configured' };
  const to = process.env.NOTIFY_EMAIL || profile.email;
  const from = process.env.NOTIFY_FROM || 'Portfolio <onboarding@resend.dev>';
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        subject: oneLine(subject),
        text: `${text}\n\n---\nReview it in your admin panel: ${site ? `${site}/admin` : '/admin'}`,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error('Resend error', res.status, await res.text().catch(() => ''));
      return { sent: false, reason: 'provider-error' };
    }
    return { sent: true };
  } catch (e) {
    console.error('notifyOwner failed', e);
    return { sent: false, reason: 'exception' };
  }
}
