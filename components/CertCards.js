'use client';
import { useEffect, useState } from 'react';
import Icon from './Icon';

/**
 * Certification cards. A card whose entry in content/site.js has a 3rd value
 * (the image path) becomes clickable and opens the certificate picture.
 * Cards without an image stay as plain cards.
 */
export default function CertCards({ certs }) {
  const [open, setOpen] = useState(null); // index of the certificate being viewed

  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = open !== null ? certs[open] : null;

  return (
    <>
      <div className="cg">
        {certs.map(([issuer, name, image], i) => {
          const body = (
            <>
              <div className="bd"><Icon name="shield" /></div>
              <div className="cb-tx"><small>{issuer}</small><b>{name}</b></div>
              {image && <span className="cb-view">View <Icon name="arrow" /></span>}
            </>
          );
          return image ? (
            <button type="button" key={issuer + name} className="card cb" onClick={() => setOpen(i)} aria-label={`View certificate: ${name}`}>
              {body}
            </button>
          ) : (
            <div key={issuer + name} className="card cb">{body}</div>
          );
        })}
      </div>

      {current && (
        <div className="mo" onMouseDown={(e) => e.target === e.currentTarget && setOpen(null)}>
          <div className="lb" role="dialog" aria-modal="true" aria-label={`${current[0]} ${current[1]}`}>
            <button type="button" className="mo-x lb-x" onClick={() => setOpen(null)} aria-label="Close"><Icon name="close" /></button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current[2]} alt={`Certificate: ${current[0]} ${current[1]}`} />
            <p><b>{current[1]}</b> · {current[0]}</p>
          </div>
        </div>
      )}
    </>
  );
}