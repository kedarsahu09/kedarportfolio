'use client';
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

// Crops to a square and shrinks to 128px so the stored photo is only a few KB.
function toAvatar(file, size = 128) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) return reject(new Error('Please choose an image file.'));
    if (file.size > 10 * 1024 * 1024) return reject(new Error('That image is too large (max 10 MB).'));
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const s = Math.min(img.width, img.height);
      const c = document.createElement('canvas');
      c.width = c.height = size;
      c.getContext('2d').drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/jpeg', 0.8));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read that image.')); };
    img.src = url;
  });
}

export default function TestimonialModal({ onClose }) {
  const [rating, setRating] = useState(5);
  const [len, setLen] = useState(0);
  const [photo, setPhoto] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [state, setState] = useState({ status: 'idle', msg: '' });
  const first = useRef(null);

  useEffect(() => {
    first.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [onClose]);

  async function onPhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setPhoto(await toAvatar(file));
      setPhotoName(file.name);
      setState({ status: 'idle', msg: '' });
    } catch (err) {
      setPhoto(''); setPhotoName('');
      setState({ status: 'error', msg: err.message });
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState({ status: 'sending', msg: '' });
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, slug: 'general', rating, photo }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Could not send your testimonial. Please try again.');
      setState({ status: 'done', msg: '' });
    } catch (err) {
      setState({ status: 'error', msg: err.message });
    }
  }

  return (
    <div className="mo" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="mo-box" role="dialog" aria-modal="true" aria-labelledby="mo-title">
        <div className="mo-head">
          <div className="cta-ic sm"><Icon name="sparkle" /></div>
          <div>
            <h3 id="mo-title">Share your experience</h3>
            <p>Your kind words make a real difference ✨</p>
          </div>
          <button type="button" className="mo-x" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
        </div>

        {state.status === 'done' ? (
          <div className="mo-done">
            <div className="cta-ic"><Icon name="check" /></div>
            <h3>Thank you!</h3>
            <p>Your testimonial was sent for review and will appear on the site once it is approved.</p>
            <button type="button" className="btn2 pri" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form className="mf" onSubmit={onSubmit}>
            <div className="mf-grid">
              <div><label htmlFor="t-name">Your name *</label><input ref={first} id="t-name" name="name" placeholder="e.g. Aakash Verma" maxLength={60} required /></div>
              <div><label htmlFor="t-role">Role / Title</label><input id="t-role" name="role" placeholder="e.g. Software Engineer" maxLength={60} /></div>
              <div><label htmlFor="t-co">Company</label><input id="t-co" name="company" placeholder="e.g. Google" maxLength={60} /></div>
              <div><label htmlFor="t-em">Email * <span className="priv"><Icon name="lock" /> private</span></label><input id="t-em" name="email" type="email" placeholder="you@example.com" maxLength={120} required /></div>
            </div>

            <div className="mf-rate">
              <label id="t-rate">Your rating</label>
              <div className="rate" role="group" aria-labelledby="t-rate">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" className={n <= rating ? 'on' : ''} aria-label={`${n} star${n > 1 ? 's' : ''}`} aria-pressed={n === rating} onClick={() => setRating(n)}>★</button>
                ))}
              </div>
            </div>

            <div className="mf-msg">
              <label htmlFor="t-msg">Your testimonial *<span className="cnt">{len}/500</span></label>
              <textarea id="t-msg" name="message" placeholder="Share your experience working with Kedar: what made the sessions valuable, any specific outcomes…" maxLength={500} minLength={3} required onChange={(e) => setLen(e.target.value.length)} />
            </div>

            <div className="mf-grid">
              <div>
                <label htmlFor="t-photo">Photo (optional)</label>
                <label className="up" htmlFor="t-photo"><Icon name="upload" /> {photoName || 'Upload'}</label>
                <input id="t-photo" className="sr" type="file" accept="image/*" onChange={onPhoto} />
              </div>
              <div><label htmlFor="t-in">LinkedIn (optional)</label><input id="t-in" name="linkedin" placeholder="https://linkedin.com/in/…" maxLength={200} /></div>
            </div>

            <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <p className="mf-note"><Icon name="shield" />Your testimonial will be reviewed before appearing on the site. Your email stays private and is only used for verification.</p>
            {state.status === 'error' && <p className="note err" role="alert">{state.msg}</p>}

            <div className="mf-act">
              <button type="button" className="btn2 out" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn2 pri" disabled={state.status === 'sending'}>
                <Icon name="sparkle" /> {state.status === 'sending' ? 'Sending…' : 'Submit Testimonial'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
