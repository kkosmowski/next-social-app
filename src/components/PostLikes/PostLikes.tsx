'use client';

import styles from './PostLikes.module.css';

type Props = {
  likesCount: number;
  likedByCurrentUser: boolean;
  onLike: VoidFunction;
};

function PostLikes({ likesCount, likedByCurrentUser, onLike }: Props) {
  const className = likedByCurrentUser ? `${styles.active}` : undefined;

  return (
    <button className={className} onClick={onLike}>
      👍 {likesCount || ''}
    </button>
  );
}

export default PostLikes;
