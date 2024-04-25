'use client';

import type { FormEvent } from 'react';
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import type { Post } from '@/types/post';
import useIntl from '@/app/hooks/useIntl';
import useCommentForm from '@/hooks/useCommentForm';
import type { AddCommentPayload, AddCommentResponse } from '@/types/comment';
import api from '@/api';
import endpoints from '@/consts/endpoints';
import { handleError } from '@/utils/handleError';
import dynamicEndpoint from '@/app/utils/dynamicEndpoint';

import styles from './AddNewComment.module.css';

type Props = {
  post: Post;
  isVisible: boolean;
  onClose: VoidFunction;
};

function AddNewComment({ post, isVisible, onClose }: Props) {
  const { t } = useIntl();
  const router = useRouter();
  const { ContentTextArea, handleSubmit, resetForm, endLoading, setErrors } = useCommentForm();

  const addComment = async (payload: AddCommentPayload) => {
    try {
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

  if (!isVisible) {
    return null;
  }

  return (
    <form className={`${styles.wrapper} card`} onSubmit={handleAddComment}>
      <h3 className={styles.title}>
        {t('COMMENTS.ADD.TITLE', { postTitle: post.title, em: (str) => <em>{str}</em> })}
      </h3>

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
