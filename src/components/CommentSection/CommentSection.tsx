import type { Comment } from '@/types/post';
import AddNewComment from '@/components/AddNewComment';
import CommentItem from '@/components/CommentItem';

import styles from './CommentSection.module.css';

type Props = {
  postId: string;
  isAddingNewComment: boolean;
  comments: Comment[];
  onCloseAddingComment: VoidFunction;
};

function CommentSection({ postId, isAddingNewComment, comments, onCloseAddingComment }: Props) {
  return (
    <>
      <AddNewComment postId={postId} isVisible={isAddingNewComment} onClose={onCloseAddingComment} />

      {!!comments.length && (
        <ul className={styles.commentsList}>
          {comments.map((comment) => (
            <CommentItem key={comment.id} {...comment} />
          ))}
        </ul>
      )}
    </>
  );
}

export default CommentSection;
