import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CommentSection from '@/components/CommentSection';
import { getPost, listApprovedComments } from '@/lib/store';
import { fmtDate, readingTime } from '@/lib/util';

export const revalidate = 60;

async function load(slug) {
  const post = await getPost(slug);
  return post && post.status === 'published' ? post : null;
}

export async function generateMetadata({ params }) {
  const post = await load(params.slug);
  if (!post) return { title: 'Post not found' };
  return { title: post.title, description: post.excerpt, openGraph: { title: post.title, description: post.excerpt, type: 'article' } };
}

export default async function PostPage({ params }) {
  const post = await load(params.slug);
  if (!post) notFound();
  const comments = await listApprovedComments(post.slug);

  return (
    <main className="page post">
      <div className="w">
        <Link className="back" href="/blog">← All posts</Link>
        <article>
          <span className="lab">{fmtDate(post.publishedAt || post.createdAt)} · {readingTime(post.content)} min read</span>
          <h1>{post.title}</h1>
          {post.tags?.length > 0 && <div className="tg" style={{ marginBottom: 34 }}>{post.tags.map((t) => <span key={t}>{t}</span>)}</div>}
          <div className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </article>
        <div style={{ marginTop: 80, paddingTop: 50, borderTop: '1px solid var(--ln)' }}>
          <CommentSection slug={post.slug} comments={comments} heading="Comments" />
        </div>
      </div>
    </main>
  );
}
