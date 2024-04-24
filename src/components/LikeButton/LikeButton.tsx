'use client';

import styles from './LikeButton.module.css';

type Props = {
  isLoading?: boolean;
  disabled?: boolean;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  onLike: VoidFunction;
};

function LikeButton({ isLoading, disabled, likesCount, isLikedByCurrentUser, onLike }: Props) {
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

export default LikeButton;
