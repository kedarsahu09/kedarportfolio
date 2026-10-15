'use client';
import { useCallback, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { slugify } from '@/lib/util';

async function api(url, opts = {}) {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...opts });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(json.error || 'Request failed');
    err.status = res.status;
    throw err;
  }
  return json;
}

const fmt = (iso) => (iso ? new Date(iso).toLocaleString() : '');

export default function AdminApp({ authed: initialAuthed, usingMemory }) {
  const [authed, setAuthed] = useState(initialAuthed);
  const [tab, setTab] = useState('comments');
  const [pending, setPending] = useState(0);

  async function logout() {
    await api('/api/admin/session', { method: 'DELETE' }).catch(() => {});
    setAuthed(false);
  }

  if (!authed) return <Login onDone={() => setAuthed(true)} />;

  return (
    <main className="adm">
      <div className="w">
        <div className="admtop">
          <h1>Admin</h1>
          <button className="btn" onClick={logout}>Sign out</button>
        </div>
        {usingMemory && (
          <p className="note err">
            No database connected: data is stored in memory and will be lost on restart. Connect Upstash Redis (see README).
          </p>
        )}
        <div className="tabs" role="tablist">
          <button role="tab" aria-selected={tab === 'comments'} className={tab === 'comments' ? 'on' : ''} onClick={() => setTab('comments')}>
            Comments{pending > 0 && <span className="dot">{pending}</span>}
          </button>
          <button role="tab" aria-selected={tab === 'posts'} className={tab === 'posts' ? 'on' : ''} onClick={() => setTab('posts')}>
            Blog posts
          </button>
        </div>
        {tab === 'comments'
          ? <Comments onPending={setPending} onAuthLost={() => setAuthed(false)} />
          : <Posts onAuthLost={() => setAuthed(false)} />}
      </div>
    </main>
  );
}

function Login({ onDone }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      await api('/api/admin/session', { method: 'POST', body: JSON.stringify({ password: pw }) });
      onDone();
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="adm">
      <div className="w" style={{ maxWidth: 440 }}>
        <h1>Admin sign in</h1>
        <form onSubmit={submit}>
          <label htmlFor="pw">Password</label>
          <input id="pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password" required />
          <button className="btn p" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
          {err && <p className="note err" role="alert">{err}</p>}
        </form>
      </div>
    </main>
  );
}

/* ---------------------------- Comments ---------------------------- */
function Comments({ onPending, onAuthLost }) {
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState('pending');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const { comments } = await api('/api/admin/comments');
      setItems(comments);
      onPending(comments.filter((c) => c.status === 'pending').length);
    } catch (e) {
      if (e.status === 401) onAuthLost();
      else setError(e.message);
    }
  }, [onPending, onAuthLost]);

  useEffect(() => { load(); }, [load]);

  async function act(fn) {
    setError('');
    try { await fn(); await load(); } catch (e) { setError(e.message); }
  }
  const setStatus = (id, status) => act(() => api('/api/admin/comments', { method: 'PATCH', body: JSON.stringify({ id, status }) }));
  const remove = (id) => confirm('Delete this comment permanently?') && act(() => api(`/api/admin/comments?id=${id}`, { method: 'DELETE' }));

  if (!items) return <p className="empty">{error || 'Loading…'}</p>;
  const shown = items.filter((c) => filter === 'all' || c.status === filter);

  return (
    <div>
      <div className="filters">
        {['pending', 'approved', 'all'].map((f) => (
          <button key={f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      {error && <p className="note err">{error}</p>}
      {shown.length === 0 && <p className="empty">Nothing here.</p>}
      <div className="cm">
        {shown.map((c) => (
          <div className="card cmi" key={c.id}>
            <div>
              <b>{c.name}</b>
              <small>{fmt(c.createdAt)} · on {c.slug === 'general' ? 'home page' : `/blog/${c.slug}`} · {c.status}</small>
              {c.email && <small> · <a href={`mailto:${c.email}`}>{c.email}</a></small>}
            </div>
            <p>{c.message}</p>
            <div className="acts">
              {c.status !== 'approved'
                ? <button className="btn p" onClick={() => setStatus(c.id, 'approved')}>Approve &amp; publish</button>
                : <button className="btn" onClick={() => setStatus(c.id, 'pending')}>Unpublish</button>}
              <button className="btn danger" onClick={() => remove(c.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- Posts ---------------------------- */
const EMPTY = { slug: '', title: '', excerpt: '', tags: '', content: '', status: 'draft', isNew: true };

function Posts({ onAuthLost }) {
  const [posts, setPosts] = useState(null);
  const [edit, setEdit] = useState(null);
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState('');

  const load = useCallback(async () => {
    try { setPosts((await api('/api/admin/posts')).posts); }
    catch (e) { if (e.status === 401) onAuthLost(); else setError(e.message); }
  }, [onAuthLost]);
  useEffect(() => { load(); }, [load]);

  async function save() {
    setError(''); setSaved('');
    try {
      const body = JSON.stringify({ ...edit, slug: edit.slug || slugify(edit.title) });
      const { post } = await api('/api/admin/posts', { method: edit.isNew ? 'POST' : 'PUT', body });
      setEdit({ ...post, tags: post.tags.join(', '), isNew: false });
      setSaved(post.status === 'published' ? 'Saved and published.' : 'Saved as draft.');
      load();
    } catch (e) { setError(e.message); }
  }

  async function remove(slug) {
    if (!confirm('Delete this post and its comments permanently?')) return;
    try { await api(`/api/admin/posts?slug=${slug}`, { method: 'DELETE' }); if (edit?.slug === slug) setEdit(null); load(); }
    catch (e) { setError(e.message); }
  }

  const set = (k) => (e) => setEdit((p) => ({ ...p, [k]: e.target.value }));

  if (edit) {
    return (
      <div className="editor">
        <div className="acts" style={{ marginBottom: 16 }}>
          <button className="btn" onClick={() => { setEdit(null); setSaved(''); setError(''); }}>← Back to posts</button>
          <button className="btn" onClick={() => setPreview((v) => !v)}>{preview ? 'Edit' : 'Preview'}</button>
        </div>
        {preview ? (
          <div className="post"><h1>{edit.title || 'Untitled'}</h1><div className="prose"><ReactMarkdown remarkPlugins={[remarkGfm]}>{edit.content}</ReactMarkdown></div></div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); save(); }}>
            <label htmlFor="t">Title</label>
            <input id="t" value={edit.title} onChange={set('title')} required />
            <label htmlFor="s">URL slug {edit.isNew ? '(auto from title if blank)' : '(cannot be changed)'}</label>
            <input id="s" value={edit.slug} onChange={set('slug')} disabled={!edit.isNew} placeholder={slugify(edit.title)} />
            <label htmlFor="x">Short summary (shown on cards; auto-filled if blank)</label>
            <input id="x" value={edit.excerpt} onChange={set('excerpt')} maxLength={300} />
            <label htmlFor="g">Tags (comma separated)</label>
            <input id="g" value={edit.tags} onChange={set('tags')} placeholder="Wiz, Defender, Azure" />
            <label htmlFor="c">Content (Markdown)</label>
            <textarea id="c" className="big" value={edit.content} onChange={set('content')} required />
            <label htmlFor="st">Status</label>
            <select id="st" value={edit.status} onChange={set('status')}>
              <option value="draft">Draft (hidden)</option>
              <option value="published">Published (visible on site)</option>
            </select>
            <button className="btn p" type="submit">Save post</button>
          </form>
        )}
        {error && <p className="note err" role="alert">{error}</p>}
        {saved && <p className="note ok" role="status">{saved}</p>}
      </div>
    );
  }

  return (
    <div>
      <div className="acts" style={{ marginBottom: 18 }}>
        <button className="btn p" onClick={() => { setEdit({ ...EMPTY }); setPreview(false); }}>+ New post</button>
      </div>
      {error && <p className="note err">{error}</p>}
      {!posts ? <p className="empty">Loading…</p> : posts.length === 0 ? <p className="empty">No posts yet. Create your first one.</p> : (
        <div className="cm">
          {posts.map((p) => (
            <div className="card cmi" key={p.slug}>
              <div><b>{p.title}</b><small>{p.status} · /blog/{p.slug} · updated {fmt(p.updatedAt)}</small></div>
              <div className="acts">
                <button className="btn" onClick={() => { setEdit({ ...p, tags: (p.tags || []).join(', '), isNew: false }); setPreview(false); setSaved(''); }}>Edit</button>
                {p.status === 'published' && <a className="btn" href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer">View</a>}
                <button className="btn danger" onClick={() => remove(p.slug)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
