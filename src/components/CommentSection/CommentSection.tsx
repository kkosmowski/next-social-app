import CommentItem from '@/components/CommentItem';
import type { Comment, OnReplyFn, SubComment } from '@/types/comment';

import styles from './CommentSection.module.css';

type Props = {
  visible: boolean;
  items: Comment[] | SubComment[];
  onReply: OnReplyFn;
};

function CommentSection({ visible, items, onReply }: Props) {
  return (
    <>
      {!!items.length && visible && (
        <ul className={styles.commentsList}>
          {items.map((comment) => (
            <CommentItem key={comment.id} comment={comment} onReply={onReply} />
          ))}
        </ul>
      )}
    </>
  );
}

export default CommentSection;
