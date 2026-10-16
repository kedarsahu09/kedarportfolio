import Icon from './Icon';

export default function ProjectCard({ p }) {
  return (
    <article className="pj">
      <div className="pj-img" style={{ backgroundImage: `url(${p.image})` }}>
        <span className="pj-cat">{p.category}</span>
        {p.href && (
          <a className="pj-go" href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.title}`}>
            <Icon name="arrow" />
          </a>
        )}
      </div>
      <div className="pj-body">
        <h3>{p.title}</h3>
        <p>{p.text}</p>
        <div className="pj-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
      </div>
    </article>
  );
}
