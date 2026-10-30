import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="page">
      <div className="w">
        <span className="lab">404</span>
        <h2 className="pt">This page does not exist.</h2>
        <p className="empty" style={{ margin: '14px 0 28px' }}>The link may be broken, or the post may have been unpublished.</p>
        <Link className="btn p" href="/">Back to home</Link>
      </div>
    </main>
  );
}
