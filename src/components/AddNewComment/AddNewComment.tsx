'use client';

import styles from './AddNewComment.module.css';

type Props = {
  postId: string;
  isVisible: boolean;
  onClose: VoidFunction;
};

function AddNewComment({ postId, isVisible }: Props) {
  if (!isVisible) {
    return null;
  }
  return <div className={styles.wrapper}>Add comment to {postId}</div>;
}

export default AddNewComment;
