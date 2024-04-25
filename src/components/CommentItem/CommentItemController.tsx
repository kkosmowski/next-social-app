import { useRouter } from 'next/navigation';

import useBoolean from '@/hooks/useBoolean';
import type { Comment } from '@/types/comment';
import api from '@/api';
import dynamicEndpoint from '@/app/utils/dynamicEndpoint';
import endpoints from '@/consts/endpoints';
import { handleError } from '@/utils/handleError';
import useIntl from '@/app/hooks/useIntl';
import { useConfirmation } from '@/contexts/ConfirmationProvider';

import styles from './CommentItemController.module.css';
import CommentItemEditor from './CommentItemEditor';
import CommentItem from './CommentItem';

function CommentItemController(comment: Comment) {
  const [isEditMode, { set: setEditMode, unset: unsetEditMode }] = useBoolean(false);
  const router = useRouter();
  const { t } = useIntl();
  const { ask } = useConfirmation();

  const handleDelete = async () => {
    try {
      await api.delete(dynamicEndpoint(endpoints.comment, { commentId: comment.id }));
      router.refresh();
    } catch (e) {
      const error = handleError(e);
      console.error(t(error.message));
    }
  };

  const confirmDelete = () => {
    ask(
      {
        title: 'COMMENTS.DELETE.CONFIRM.TITLE',
        description: 'COMMENTS.DELETE.CONFIRM.DESCRIPTION',
      },
      { onConfirm: handleDelete },
    );
  };

  return (
    <article className={`${styles.wrapper} card`}>
      {isEditMode ? (
        <CommentItemEditor {...comment} onClose={unsetEditMode} />
      ) : (
        <CommentItem {...comment} onEdit={setEditMode} onDelete={confirmDelete} />
      )}
    </article>
  );
}

export default CommentItemController;
