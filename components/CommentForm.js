'use client';
import { useState } from 'react';

export default function CommentForm({ slug }) {
  const [state, setState] = useState({ status: 'idle', msg: '' });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState({ status: 'sending', msg: '' });
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, slug }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Could not send your comment. Please try again.');
      form.reset();
      setState({ status: 'done', msg: 'Thank you. Your comment was sent for review and will appear once it is approved.' });
    } catch (err) {
      setState({ status: 'error', msg: err.message });
    }
  }

  const id = (f) => `${slug}-${f}`;
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor={id('name')}>Name</label>
      <input id={id('name')} name="name" placeholder="Your name" maxLength={60} required />
      <label htmlFor={id('email')}>Email (optional, never shown publicly)</label>
      <input id={id('email')} name="email" type="email" placeholder="you@company.com" maxLength={120} />
      <label htmlFor={id('message')}>Comment</label>
      <textarea id={id('message')} name="message" placeholder="Share your thoughts" minLength={3} maxLength={1000} required />
      {/* Honeypot: real visitors never see or fill this */}
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn p" type="submit" disabled={state.status === 'sending'}>
        {state.status === 'sending' ? 'Sending…' : 'Submit comment'}
      </button>
      {state.msg && (
        <p className={`note ${state.status === 'done' ? 'ok' : 'err'}`} role="status">{state.msg}</p>
      )}
    </form>
  );
}
