'use client';

import type { FormEvent } from 'react';

import { useRouter } from 'next/navigation';

import useIntl from '@/app/hooks/useIntl';
import type { AddPostPayload, AddPostResponse } from '@/types/post';
import usePostForm from '@/hooks/usePostForm';
import api from '@/api';
import endpoints from '@/consts/endpoints';
import { handleError } from '@/utils/handleError';

import styles from './AddNewPost.module.css';

type Props = {
  onClose: VoidFunction;
};

function AddNewPost({ onClose }: Props) {
  const { t } = useIntl();
  const { TitleInput, ContentTextArea, TagsInput, isLoading, handleSubmit, endLoading, resetErrors, setErrors } =
    usePostForm();
  const router = useRouter();

  const addPost = async (payload: AddPostPayload) => {
    try {
      return api.post<AddPostPayload, AddPostResponse>(endpoints.posts, payload);
    } catch (e) {
      const error = handleError(e);
      endLoading();
      setErrors((errors) => ({
        ...errors,
        global: error.message ?? 'ERROR.UNKNOWN',
      }));
    }
  };

  const handleClose = () => {
    resetErrors();
    onClose();
  };

  const handleAddNewPost = async (event: FormEvent) => {
    await handleSubmit(event, addPost);
    handleClose();
    router.refresh();
  };

  return (
    <form className={styles.form} onSubmit={handleAddNewPost}>
      {TitleInput}
      {ContentTextArea}
      {TagsInput}

      <footer className={styles.controls}>
        <button className="primary filled" type="submit" disabled={isLoading}>
          {t(isLoading ? 'COMMON.LOADING' : 'POSTS.FORM.SUBMIT.ADD')}
        </button>
        <button className="secondary" type="button" disabled={isLoading} onClick={handleClose}>
          {t('COMMON.CANCEL')}
        </button>
      </footer>
    </form>
  );
}

export default AddNewPost;
