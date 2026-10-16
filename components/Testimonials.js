import Icon from './Icon';
import Stars from './Stars';

const CARD_W = 300; // keep in sync with .tm width in sections.css
const GAP = 18;

function Card({ t, hidden }) {
  const initial = (t.name || '?').trim().charAt(0).toUpperCase();
  const sub = [t.role, t.company].filter(Boolean).join(' · ');
  return (
    <figure className="tm" aria-hidden={hidden ? 'true' : undefined}>
      <div className="tm-top">
        <span className="qm" aria-hidden="true">“</span>
        {t.rating > 0 && <Stars n={t.rating} />}
      </div>
      <blockquote>{t.message}</blockquote>
      <figcaption>
        {t.photo
          // eslint-disable-next-line @next/next/no-img-element
          ? <img className="av" src={t.photo} alt="" width="36" height="36" />
          : <span className="av" aria-hidden="true">{initial}</span>}
        <span className="who"><b>{t.name}</b>{sub && <small>{sub}</small>}</span>
        {t.linkedin && (
          <a className="tm-in" href={t.linkedin} target="_blank" rel="noopener noreferrer nofollow" aria-label={`${t.name} on LinkedIn`} tabIndex={hidden ? -1 : undefined}>
            <Icon name="linkedin" />
          </a>
        )}
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse }) {
  const loop = items.length * (CARD_W + GAP);                 // distance of one full cycle
  const copies = Math.max(2, Math.ceil(2800 / loop) + 1);     // enough copies to fill wide screens
  const dur = Math.max(25, Math.round(loop / 45));            // ~45px per second
  return (
    <div className={`mq${reverse ? ' rev' : ''}`}>
      <div className="mq-track" style={{ '--loop': `${loop}px`, '--dur': `${dur}s` }}>
        {Array.from({ length: copies }).flatMap((_, c) =>
          items.map((t) => <Card key={`${c}-${t.id}`} t={t} hidden={c > 0} />)
        )}
      </div>
    </div>
  );
}

export default function Testimonials({ items }) {
  if (!items.length) {
    return <p className="empty center">No testimonials yet. Be the first to share your experience.</p>;
  }
  if (items.length < 5) {
    return <div className="tm-static">{items.map((t) => <Card key={t.id} t={t} />)}</div>;
  }
  if (items.length < 8) return <Row items={items} />;
  return (
    <>
      <Row items={items.filter((_, i) => i % 2 === 0)} />
      <Row items={items.filter((_, i) => i % 2 === 1)} reverse />
    </>
  );
}
