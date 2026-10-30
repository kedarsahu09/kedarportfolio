import CommentForm from './CommentForm';
import { fmtDate } from '@/lib/util';

// Server component: shows approved comments, plus the form to submit a new one.
export default function CommentSection({ slug, comments, heading = 'Comments' }) {
  return (
    <div className="ct cmwrap">
      <div>
        <h3>{heading} ({comments.length})</h3>
        <p className="sb">Comments are reviewed before they appear here.</p>
        {comments.length === 0 ? (
          <p className="empty">No comments yet. Be the first to leave one.</p>
        ) : (
          <div className="cm">
            {comments.map((c) => (
              <div className="card cmi" key={c.id}>
                <div><b>{c.name}</b><small>{fmtDate(c.createdAt)}</small></div>
                <p>{c.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <CommentForm slug={slug} />
    </div>
  );
}
