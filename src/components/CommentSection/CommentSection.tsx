import type { Post } from '@/types/post';
import AddNewComment from '@/components/AddNewComment';
import CommentItem from '@/components/CommentItem';

import styles from './CommentSection.module.css';

type Props = {
  post: Post;
  isAddingNewComment: boolean;
  onCloseAddingComment: VoidFunction;
};

function CommentSection({ post, isAddingNewComment, onCloseAddingComment }: Props) {
  return (
    <>
      <AddNewComment post={post} isVisible={isAddingNewComment} onClose={onCloseAddingComment} />

      {!!post.comments.length && (
        <ul className={styles.commentsList}>
          {post.comments.map((comment) => (
            <CommentItem key={comment.id} {...comment} />
          ))}
        </ul>
      )}
    </>
  );
}

export default CommentSection;
