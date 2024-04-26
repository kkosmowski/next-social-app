'use client';

import { useRef } from 'react';

import { useRouter } from 'next/navigation';

import useBoolean from '@/hooks/useBoolean';
import type { Comment, SubComment } from '@/types/comment';
import api from '@/api';
import dynamicEndpoint from '@/app/utils/dynamicEndpoint';
import endpoints from '@/consts/endpoints';
import { handleError } from '@/utils/handleError';
import useIntl from '@/app/hooks/useIntl';
import { useConfirmation } from '@/contexts/ConfirmationProvider';

import styles from './CommentItemController.module.css';
import CommentItemEditor from './CommentItemEditor';
import CommentItem from './CommentItem';

type Props = {
  onReply: (element: HTMLDivElement, comment: Comment | SubComment) => void;
} & (
  | {
      isSubComment: false;
      comment: Comment;
    }
  | {
      isSubComment: true;
      comment: SubComment;
    }
);

function CommentItemController({ onReply, isSubComment, comment }: Props) {
  const [isEditMode, { set: setEditMode, unset: unsetEditMode }] = useBoolean(false);
  const router = useRouter();
  const { t, locale } = useIntl();
  const { ask } = useConfirmation();
  const templateRef = useRef<HTMLDivElement>(null);

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
    <>
      <article className={`${styles.wrapper} ${isSubComment && styles.subComment} card`}>
        {isEditMode ? (
          <CommentItemEditor {...comment} onClose={unsetEditMode} />
        ) : (
          <CommentItem
            comment={comment}
            locale={locale}
            onEdit={setEditMode}
            onReply={() => onReply(templateRef.current!, comment)}
            onDelete={confirmDelete}
          />
        )}
      </article>

      <div ref={templateRef} />

      {!isSubComment &&
        comment.subComments.map((subComment) => (
          <CommentItemController key={subComment.id} comment={subComment} isSubComment={true} onReply={onReply} />
        ))}
    </>
  );
}

export default CommentItemController;
