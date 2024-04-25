import useBoolean from '@/hooks/useBoolean';
import type { Comment } from '@/types/comment';

import CommentItem from './CommentItem';
import CommentItemEditor from './CommentItemEditor';
import styles from './CommentItemController.module.css';

function CommentItemController(comment: Comment) {
  const [isEditMode, { set: setEditMode, unset: unsetEditMode }] = useBoolean(false);

  const handleDelete = () => {};

  return (
    <article className={`${styles.wrapper} card`}>
      {isEditMode ? (
        <CommentItemEditor {...comment} onClose={unsetEditMode} />
      ) : (
        <CommentItem {...comment} onEdit={setEditMode} onDelete={handleDelete} />
      )}
    </article>
  );
}

export default CommentItemController;
