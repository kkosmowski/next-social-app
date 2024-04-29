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
import useIntl from '@/app/hooks/useIntl';
import ToggleCommentsButton from '@/components/ToggleRepliesButton';

import styles from './CommentActions.module.css';

type Props = {
  commentId: string;
  isSubComment: boolean;
  likes: CommentLike[];
  isEditMode?: boolean;
  repliesVisible?: boolean;
  repliesCount?: number;
  onReply?: VoidFunction;
  onToggleReplies?: VoidFunction;
};

async function addLike(commentId: string, isSubComment: boolean) {
  await api.post(dynamicEndpoint(endpoints.commentLike, { commentId }), { isSubComment });
}

async function removeLike(commentId: string, isSubComment: boolean) {
  await api.delete(dynamicEndpoint(endpoints.commentLike, { commentId }), { isSubComment });
}

function CommentActions({
  commentId,
  isSubComment,
  likes,
  isEditMode,
  repliesCount,
  repliesVisible,
  onReply,
  onToggleReplies,
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
        await removeLike(commentId, isSubComment);
      } else {
        await addLike(commentId, isSubComment);
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

      <ReplyButton onReply={onReply} disabled={isEditMode} />

      {!!repliesCount && (
        <ToggleCommentsButton visible={repliesVisible} subComments count={repliesCount} onToggle={onToggleReplies} />
      )}
    </footer>
  );
}

export default CommentActions;
