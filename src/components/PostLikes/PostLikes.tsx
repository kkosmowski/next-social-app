'use client';

import styles from './PostLikes.module.css';

type Props = {
  isLoading: boolean;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  onLike: VoidFunction;
};

function PostLikes({ isLoading, likesCount, isLikedByCurrentUser, onLike }: Props) {
  const className = isLikedByCurrentUser ? `${styles.active}` : undefined;

  return (
    <button className={className} onClick={onLike} disabled={isLoading}>
      👍 {likesCount || ''}
    </button>
  );
}

export default PostLikes;
