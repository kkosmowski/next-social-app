'use client';

import styles from './PostLikes.module.css';

type Props = {
  isLoading: boolean;
  disabled?: boolean;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  onLike: VoidFunction;
};

function PostLikes({ isLoading, disabled, likesCount, isLikedByCurrentUser, onLike }: Props) {
  const className = isLikedByCurrentUser ? `${styles.active} icon` : 'icon';
  let content = '👍';

  if (likesCount) {
    content += ` ${likesCount}`;
  }

  return (
    <button className={className} onClick={onLike} disabled={disabled || isLoading}>
      {content}
    </button>
  );
}

export default PostLikes;
