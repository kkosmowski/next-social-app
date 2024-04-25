'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import LikeButton from '@/components/LikeButton';
import { useAuth } from '@/contexts/AuthProvider';
import type { CommentLike } from '@/types/comment';
import dynamicRoute from '@/app/utils/dynamicRoute';
import { Routes } from '@/consts/navigation';
import api from '@/api';
import dynamicEndpoint from '@/app/utils/dynamicEndpoint';
import endpoints from '@/consts/endpoints';
import ReplyButton from '@/components/ReplyButton';

import styles from './CommentActions.module.css';

type Props = {
  commentId: string;
  likes: CommentLike[];
  isEditMode?: boolean;
};

async function addLike(commentId: string) {
  await api.post(dynamicEndpoint(endpoints.commentLike, { commentId }));
}

async function removeLike(commentId: string) {
  await api.delete(dynamicEndpoint(endpoints.commentLike, { commentId }));
}

function CommentActions({ commentId, likes, isEditMode }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const likesCount = likes.length;
  const isLikedByCurrentUser = !!user?.id && likes.some((like) => user.id === like.userId);

  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    setIsLoading(true);
    if (!user) {
      router.push(dynamicRoute(Routes.login));
      return;
    }

    try {
      if (isLikedByCurrentUser) {
        await removeLike(commentId);
      } else {
        await addLike(commentId);
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

      <ReplyButton onReply={() => {}} disabled={isEditMode} />
    </footer>
  );
}

export default CommentActions;
