import Link from 'next/link';
import { fmtDate, readingTime } from '@/lib/util';

export default function PostCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card pc">
      <small>{fmtDate(post.publishedAt || post.createdAt)} · {readingTime(post.content)} min read</small>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      {post.tags?.length > 0 && (
        <div className="tg">{post.tags.map((t) => <span key={t}>{t}</span>)}</div>
      )}
    </Link>
  );
}
