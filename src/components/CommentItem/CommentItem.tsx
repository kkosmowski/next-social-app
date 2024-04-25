import type { Comment } from '@/types/comment';
import CommentActions from '@/components/CommentActions';
import ItemDetails from '@/components/ItemDetails';
import ItemContent from '@/components/ItemContent';

import styles from './CommentItem.module.css';

function CommentItem({ id, content, user, created, likes }: Comment) {
  return (
    <article className={`${styles.comment} card`}>
      <ItemDetails created={created} user={user} />
      <ItemContent content={content} smallPadding />
      <CommentActions commentId={id} likes={likes} />
    </article>
  );
}

export default CommentItem;
