'use client';

import type { FormEvent } from 'react';
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import type { Post } from '@/types/post';
import useIntl from '@/app/hooks/useIntl';
import useCommentForm from '@/hooks/useCommentForm';
import type { AddCommentPayload, AddCommentResponse, Comment, CommentFormValues, SubComment } from '@/types/comment';
import api from '@/api';
import endpoints from '@/consts/endpoints';
import { handleError } from '@/utils/handleError';
import dynamicEndpoint from '@/app/utils/dynamicEndpoint';
import isSubComment from '@/utils/isSubComment';

import styles from './AddNewComment.module.css';

type Props = {
  post: Post;
  comment?: Comment | SubComment;
  onClose: VoidFunction;
};

function AddNewComment({ post, comment, onClose }: Props) {
  const { t } = useIntl();
  const router = useRouter();
  const { ContentTextArea, handleSubmit, resetForm, endLoading, setErrors } = useCommentForm();

  const title = comment
    ? t('COMMENTS.REPLY.TITLE', { author: comment.user.username, em: (str) => <em>{str}</em> })
    : t('COMMENTS.ADD.TITLE', { postTitle: post.title, em: (str) => <em>{str}</em> });

  const addComment = async (payload: CommentFormValues) => {
    try {
      if (comment) {
        // to avoid sub comments to sub comments, we flatten the tree by creating sub comments to "main" comment
        const commentId = isSubComment(comment) ? comment.commentId : comment.id;

        return api.post<AddCommentPayload, AddCommentResponse>(
          dynamicEndpoint(endpoints.commentComment, { commentId }),
          { ...payload },
        );
      }
      return api.post<AddCommentPayload, AddCommentResponse>(
        dynamicEndpoint(endpoints.commentPost, { postId: post.id }),
        payload,
      );
    } catch (e) {
      const error = handleError(e);
      endLoading();
      setErrors((errors) => ({
        ...errors,
        global: error.message ?? 'ERROR.UNKNOWN',
      }));
    }
  };

  const handleAddComment = async (event: FormEvent) => {
    await handleSubmit(event, addComment);
    onClose();
    router.refresh();
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <form className={`${styles.wrapper} ${!!comment && styles.reply} card`} onSubmit={handleAddComment}>
      <h3 className={styles.title}>{title}</h3>

      {ContentTextArea}

      <footer className={styles.footer}>
        <button className="primary filled">{t('COMMENTS.ADD.SUBMIT')}</button>
        <button className="secondary" type="button" onClick={onClose}>
          {t('COMMON.CANCEL')}
        </button>
      </footer>
    </form>
  );
}

export default AddNewComment;
