import type { Post } from '@/types/post';
import CommentItem from '@/components/CommentItem';
import type { Comment, SubComment } from '@/types/comment';

import styles from './CommentSection.module.css';

type Props = {
  post: Post;
  onReply: (element: HTMLDivElement | null, comment: Comment | SubComment) => void;
};

function CommentSection({ post, onReply }: Props) {
  return (
    <>
      {!!post.comments.length && (
        <ul className={styles.commentsList}>
          {post.comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} isSubComment={false} onReply={onReply} />
          ))}
        </ul>
      )}
    </>
  );
}

export default CommentSection;
