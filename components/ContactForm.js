'use client';
import { useState } from 'react';
import Icon from './Icon';

export default function ContactForm() {
  const [state, setState] = useState({ status: 'idle', msg: '' });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState({ status: 'sending', msg: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Could not send your message. Please try again.');
      form.reset();
      setState({ status: 'done', msg: 'Message sent. Thank you! I will get back to you soon.' });
    } catch (err) {
      setState({ status: 'error', msg: err.message });
    }
  }

  return (
    <form className="cform" onSubmit={onSubmit}>
      <div className="cf-row">
        <div><label htmlFor="c-name">Name *</label><input id="c-name" name="name" placeholder="Your name" maxLength={80} required /></div>
        <div><label htmlFor="c-email">Email *</label><input id="c-email" name="email" type="email" placeholder="you@example.com" maxLength={120} required /></div>
      </div>
      <div><label htmlFor="c-subject">Subject</label><input id="c-subject" name="subject" placeholder="What's this about?" maxLength={120} /></div>
      <div><label htmlFor="c-msg">Message *</label><textarea id="c-msg" name="message" placeholder="Tell me about your idea…" maxLength={3000} required /></div>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" className="btn2 pri block" disabled={state.status === 'sending'}>
        {state.status === 'sending' ? 'Sending…' : <>Send Message <Icon name="send" /></>}
      </button>
      {state.msg && <p className={`note ${state.status === 'done' ? 'ok' : 'err'}`} role="status">{state.msg}</p>}
    </form>
  );
}
