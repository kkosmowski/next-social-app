'use client';

import { useRef } from 'react';

import { useRouter } from 'next/navigation';

import useBoolean from '@/hooks/useBoolean';
import type { Comment, OnReplyFn, SubComment } from '@/types/comment';
import api from '@/api';
import dynamicEndpoint from '@/app/utils/dynamicEndpoint';
import endpoints from '@/consts/endpoints';
import { handleError } from '@/utils/handleError';
import useIntl from '@/app/hooks/useIntl';
import { useConfirmation } from '@/contexts/ConfirmationProvider';
import CommentSection from '@/components/CommentSection';
import isSubCommentFn from '@/utils/isSubComment';
import { LS_FALSE } from '@/consts/common';

import styles from './CommentItemController.module.css';
import CommentItemEditor from './CommentItemEditor';
import CommentItem from './CommentItem';

type Props = {
  onReply: OnReplyFn;
  comment: Comment | SubComment;
};

const repliesVisibilityKey = (commentId: string) => `${commentId}_replies_visible`;

function loadRepliesVisibility(comment: Comment | SubComment) {
  if (isSubCommentFn(comment) || !comment.subComments.length) {
    return true;
  }
  return localStorage.getItem(repliesVisibilityKey(comment.id)) !== LS_FALSE;
}

function CommentItemController({ onReply, comment }: Props) {
  const [isEditMode, { set: setEditMode, unset: unsetEditMode }] = useBoolean(false);
  const [repliesVisible, { toggle: toggleRepliesVisibility }] = useBoolean(loadRepliesVisibility(comment));
  const router = useRouter();
  const { t, locale } = useIntl();
  const { ask } = useConfirmation();
  const templateRef = useRef<HTMLDivElement>(null);
  const isSubComment = isSubCommentFn(comment);

  const handleDelete = async () => {
    try {
      await api.delete(dynamicEndpoint(endpoints.comment, { commentId: comment.id }), { isSubComment });
      router.refresh();
    } catch (e) {
      const error = handleError(e);
      console.error(t(error.message));
    }
  };

  const handleToggleReplies = () => {
    toggleRepliesVisibility((value) => {
      const key = repliesVisibilityKey(comment.id);
      if (value) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, LS_FALSE);
      }
    });
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
          <CommentItemEditor isSubComment={isSubComment} {...comment} onClose={unsetEditMode} />
        ) : (
          <CommentItem
            comment={comment}
            locale={locale}
            repliesVisible={repliesVisible}
            onEdit={setEditMode}
            onReply={() => onReply(templateRef.current!, comment)}
            onDelete={confirmDelete}
            onToggleReplies={handleToggleReplies}
          />
        )}
      </article>

      <div ref={templateRef} />

      {!isSubComment && <CommentSection visible={repliesVisible} items={comment.subComments} onReply={onReply} />}
    </>
  );
}

export default CommentItemController;
