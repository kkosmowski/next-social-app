'use client';

import type { FormEvent } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import type { Post, AddPostPayload, AddPostResponse } from '@/types/post';
import dynamicRoute from '@/app/utils/dynamicRoute';
import { Routes } from '@/consts/navigation';
import formatDate from '@/utils/formatDate';
import PostActions from '@/components/PostActions';
import useIntl from '@/app/hooks/useIntl';
import usePostForm from '@/hooks/usePostForm';
import api from '@/api';
import endpoints from '@/consts/endpoints';
import { handleError } from '@/utils/handleError';
import dynamicEndpoint from '@/app/utils/dynamicEndpoint';

import styles from './PostItemEditor.module.css';

type Props = Post & {
  onClose: VoidFunction;
};

function PostItemEditor(props: Props) {
  const { id, title, content, tags, user, created, likes, onClose } = props;
  const { TitleInput, ContentTextArea, TagsInput, isLoading, handleSubmit, endLoading, setErrors } = usePostForm({
    initialValues: {
      title,
      content,
      tags: tags.join(','),
    },
    ghostInputs: true,
  });
  const { t } = useIntl();
  const router = useRouter();

  const updatePost = async (payload: AddPostPayload) => {
    try {
      return api.patch<AddPostPayload, AddPostResponse>(dynamicEndpoint(endpoints.post, { postId: id }), payload);
    } catch (e) {
      const error = handleError(e);
      endLoading();
      setErrors((errors) => ({
        ...errors,
        global: error.message ?? 'ERROR.UNKNOWN',
      }));
    }
  };

  const handleUpdatePost = async (event: FormEvent) => {
    await handleSubmit(event, updatePost);
    onClose();
    router.refresh();
  };

  return (
    <form className={styles.wrapper} onSubmit={handleUpdatePost}>
      <header className={styles.header}>{TitleInput}</header>

      <section className={styles.details}>
        <address className={styles.author}>
          <Link href={dynamicRoute(Routes.user, { username: user.username })}>{user.username}</Link>
        </address>
        <time className={styles.date}>{formatDate(created, 'd-MM-yyyy hh:mm')}</time>
      </section>

      {ContentTextArea}
      {TagsInput}

      <footer className={styles.controls}>
        <button className="primary filled" type="submit" disabled={isLoading}>
          {t(isLoading ? 'COMMON.LOADING' : 'POSTS.FORM.SUBMIT.EDIT')}
        </button>
        <button className="secondary" type="button" disabled={isLoading} onClick={onClose}>
          {t('COMMON.CANCEL')}
        </button>
      </footer>

      <PostActions postId={id} likes={likes} isEditMode />
    </form>
  );
}

export default PostItemEditor;
