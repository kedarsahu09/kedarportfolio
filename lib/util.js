export const RESERVED_SLUGS = ['general', 'admin', 'api', 'new'];

export function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function fmtDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function readingTime(text) {
  const words = String(text || '').trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
