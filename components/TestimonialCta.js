'use client';
import { useRef, useState } from 'react';
import Icon from './Icon';
import TestimonialModal from './TestimonialModal';

export default function TestimonialCta({ cfg }) {
  const [open, setOpen] = useState(false);
  const btn = useRef(null);
  return (
    <>
      <div className="cta">
        <div className="cta-ic"><Icon name="chat" /></div>
        <div className="cta-tx">
          <span className="chip"><Icon name="sparkle" />{cfg.chip}</span>
          <h3>{cfg.titleA} <span className="gt">{cfg.titleB}</span></h3>
          <p>{cfg.text}</p>
        </div>
        <button ref={btn} type="button" className="btn2 pri" onClick={() => setOpen(true)}>
          {cfg.button} <span aria-hidden="true">›</span>
        </button>
      </div>
      {open && <TestimonialModal onClose={() => { setOpen(false); btn.current?.focus(); }} />}
    </>
  );
}
