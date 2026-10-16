import { Redis } from '@upstash/redis';

// Upstash Redis (free tier) is the database. On Vercel, connecting an Upstash store
// adds the env vars automatically. Without them (plain local dev) data is kept in
// memory and resets whenever the server restarts.
const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

export const usingMemory = !redis;

const g = globalThis;
const mem = g.__portfolioMem || (g.__portfolioMem = { comments: {}, posts: {}, rl: new Map() });
mem.messages = mem.messages || {};

const rk = (name) => `portfolio:${name}`;

async function all(name) {
  if (redis) return Object.values((await redis.hgetall(rk(name))) || {});
  return Object.values(mem[name]);
}
async function put(name, id, value) {
  if (redis) await redis.hset(rk(name), { [id]: value });
  else mem[name][id] = value;
}
async function get(name, id) {
  if (redis) return (await redis.hget(rk(name), id)) || null;
  return mem[name][id] || null;
}
async function del(name, id) {
  if (redis) await redis.hdel(rk(name), id);
  else delete mem[name][id];
}

const newestFirst = (field) => (a, b) => new Date(b[field] || 0) - new Date(a[field] || 0);

/* ---------------- comments ---------------- */
export async function listComments() {
  return (await all('comments')).sort(newestFirst('createdAt'));
}

// Public-safe: only approved comments, and never the email address.
export async function listApprovedComments(slug) {
  try {
    return (await listComments())
      .filter((c) => c.slug === slug && c.status === 'approved')
      .map(({ id, name, role, company, rating, message, photo, linkedin, createdAt }) => ({
        id, name, role, company, rating, message, photo, linkedin, createdAt,
      }));
  } catch (e) {
    console.error('listApprovedComments failed', e);
    return [];
  }
}

export async function addComment(c) {
  await put('comments', c.id, c);
}

export async function setCommentStatus(id, status) {
  const c = await get('comments', id);
  if (!c) return null;
  const next = { ...c, status, reviewedAt: new Date().toISOString() };
  await put('comments', id, next);
  return next;
}

export async function deleteComment(id) {
  await del('comments', id);
}

/* ---------------- contact messages (private, admin only) ---------------- */
export async function listMessages() {
  return (await all('messages')).sort(newestFirst('createdAt'));
}

export async function addMessage(m) {
  await put('messages', m.id, m);
}

export async function setMessageStatus(id, status) {
  const m = await get('messages', id);
  if (!m) return null;
  const next = { ...m, status };
  await put('messages', id, next);
  return next;
}

export async function deleteMessage(id) {
  await del('messages', id);
}

/* ---------------- blog posts ---------------- */
export async function listPosts() {
  return (await all('posts')).sort(newestFirst('createdAt'));
}

export async function listPublishedPosts() {
  try {
    return (await listPosts()).filter((p) => p.status === 'published').sort(newestFirst('publishedAt'));
  } catch (e) {
    console.error('listPublishedPosts failed', e);
    return [];
  }
}

export async function getPost(slug) {
  return get('posts', slug);
}

export async function savePost(post) {
  await put('posts', post.slug, post);
}

export async function deletePost(slug) {
  await del('posts', slug);
  const related = (await listComments()).filter((c) => c.slug === slug);
  await Promise.all(related.map((c) => del('comments', c.id)));
}

/* ---------------- rate limiting ---------------- */
export async function rateLimit(key, limit, windowSec) {
  if (redis) {
    const k = rk(`rl:${key}`);
    const n = await redis.incr(k);
    if (n === 1) await redis.expire(k, windowSec);
    return n <= limit;
  }
  const now = Date.now();
  const e = mem.rl.get(key);
  if (!e || e.reset < now) {
    mem.rl.set(key, { n: 1, reset: now + windowSec * 1000 });
    return true;
  }
  e.n += 1;
  return e.n <= limit;
}
