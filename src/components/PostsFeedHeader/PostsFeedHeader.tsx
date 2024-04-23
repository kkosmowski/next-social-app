'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import useIntl from '@/app/hooks/useIntl';
import AddNewPost from '@/components/AddNewPost';
import getFormData from '@/utils/getFormData';
import api from '@/api';
import endpoints from '@/consts/endpoints';
import type { AddPostForm, AddPostPayload, AddPostResponse } from '@/types/post';
import type { FormErrors } from '@/types/common';
import { handleError } from '@/utils/handleError';

import styles from './PostsFeedHeader.module.css';

const initialErrors: FormErrors<AddPostPayload> = {
  title: undefined,
  content: undefined,
  tags: undefined,
  global: undefined,
};

function PostsFeedHeader() {
  const { t } = useIntl();
  const [isAddingNewPost, setIsAddingNewPost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors<AddPostForm>>(initialErrors);
  const router = useRouter();

  const addPost = async (payload: AddPostPayload) => {
    try {
      return api.post<AddPostPayload, AddPostResponse>(endpoints.posts, payload);
    } catch (e) {
      const error = handleError(e);
      setIsLoading(false);
      setErrors((errors) => ({
        ...errors,
        global: error.message ?? 'ERROR.UNKNOWN',
      }));
    }
  };

  const toggleAddingNewPost = () => {
    setIsAddingNewPost((value) => !value);
    setErrors(initialErrors);
  };

  const handleAddNewPost = async (event: FormEvent) => {
    setIsLoading(true);
    event.preventDefault();

    const formData = getFormData<AddPostForm>(event.target);

    if (formData?.errors) {
      setErrors(formData.errors);
      setIsLoading(false);
      return;
    }

    if (!formData?.data) {
      setIsLoading(false);
      return;
    }

    const payload: AddPostPayload = {
      title: formData.data.title,
      content: formData.data.content,
      tags: formData.data.tags ? formData.data.tags.split(/,\s?/g) : [],
    };

    await addPost(payload);
    setIsLoading(false);
    toggleAddingNewPost();
    router.refresh();
  };

  return (
    <>
      <header className={styles.header}>
        <h2>{t('POSTS.TITLE')}</h2>
        {!isAddingNewPost && (
          <button className="ghost primary" onClick={toggleAddingNewPost}>
            + {t('POSTS.CREATE')}
          </button>
        )}
      </header>

      {isAddingNewPost && (
        <AddNewPost isLoading={isLoading} errors={errors} onCancel={toggleAddingNewPost} onSubmit={handleAddNewPost} />
      )}
    </>
  );
}

export default PostsFeedHeader;
