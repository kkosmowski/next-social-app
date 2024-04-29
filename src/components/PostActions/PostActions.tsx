'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import CommentButton from '@/components/CommentButton';
import LikeButton from '../LikeButton';
import ShareButton from '@/components/ShareButton';
import type { PostLike } from '@/types/post';
import { useAuth } from '@/contexts/AuthProvider';
import dynamicEndpoint from '@/app/utils/dynamicEndpoint';
import dynamicRoute from '@/app/utils/dynamicRoute';
import { Routes } from '@/consts/navigation';
import api from '@/api';
import endpoints from '@/consts/endpoints';
import useIntl from '@/app/hooks/useIntl';
import ToggleCommentsButton from '@/components/ToggleRepliesButton';

import styles from './PostActions.module.css';

type Props = {
  postId: string;
  likes: PostLike[];
  isEditMode?: boolean;
  commentsVisible?: boolean;
  commentsCount: number;
  onComment?: VoidFunction;
  onToggleComments?: VoidFunction;
};

async function addLike(postId: string) {
  await api.post(dynamicEndpoint(endpoints.postLike, { postId }));
}

async function removeLike(postId: string) {
  await api.delete(dynamicEndpoint(endpoints.postLike, { postId }));
}

function PostActions({
  postId,
  likes,
  isEditMode,
  commentsCount,
  commentsVisible,
  onComment,
  onToggleComments,
}: Props) {
  const { locale } = useIntl();
  const { user } = useAuth();
  const router = useRouter();
  const likesCount = likes.length;
  const isLikedByCurrentUser = !!user?.id && likes.some((like) => user.id === like.userId);

  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    setIsLoading(true);
    if (!user) {
      router.push(dynamicRoute(Routes.login, { locale }));
      return;
    }

    try {
      if (isLikedByCurrentUser) {
        await removeLike(postId);
      } else {
        await addLike(postId);
      }
      router.refresh();
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <footer className={styles.footer}>
      <LikeButton
        isLoading={isLoading}
        disabled={isEditMode}
        isLikedByCurrentUser={isLikedByCurrentUser}
        likesCount={likesCount}
        onLike={handleLike}
      />

      <CommentButton disabled={isEditMode} onClick={onComment} />

      <ShareButton disabled={isEditMode} />

      {!!commentsCount && (
        <ToggleCommentsButton visible={commentsVisible} count={commentsCount} onToggle={onToggleComments} />
      )}
    </footer>
  );
}

export default PostActions;
