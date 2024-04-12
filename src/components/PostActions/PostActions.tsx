'use client';

import { useRouter } from 'next/navigation';

import CommentButton from '@/components/CommentButton';
import PostLikes from '@/components/PostLikes';
import ShareButton from '@/components/ShareButton';
import type { PostLike } from '@/types/post';
import { useAuth } from '@/contexts/AuthProvider';
import dynamicRoute from '@/app/utils/dynamicRoute';
import useIntl from '@/app/hooks/useIntl';
import { Routes } from '@/consts/navigation';

import styles from './PostActions.module.css';

type Props = {
  likes: PostLike[];
};

function PostActions({ likes }: Props) {
  const { user } = useAuth();
  const { localeCode } = useIntl();
  const router = useRouter();
  const likesCount = likes.length;
  const likedByCurrentUser = !!user?.id && likes.some((like) => user.id === like.userId);

  const handleLike = () => {
    if (!user) {
      router.push(dynamicRoute(Routes.login, { localeCode }));
    }
  };

  return (
    <footer className={styles.footer}>
      <PostLikes likedByCurrentUser={likedByCurrentUser} likesCount={likesCount} onLike={handleLike} />

      <CommentButton />

      <ShareButton />
    </footer>
  );
}

export default PostActions;
