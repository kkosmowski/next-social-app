import type { Post } from '@/types/post';
import TagsList from '@/components/TagsList';
import PostActions from '@/components/PostActions';
import ItemDetails from '@/components/ItemDetails';
import ItemContent from '@/components/ItemContent';

import styles from './PostItem.module.css';

type Props = Post & {
  onEdit: VoidFunction;
  onComment: VoidFunction;
  onDelete: VoidFunction;
};

function PostItem(props: Props) {
  const { id, title, content, user, tags, likes, created, updated, onEdit, onComment, onDelete } = props;

  return (
    <article className={`${styles.wrapper} card`}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </header>

      <ItemDetails user={user} created={created} updated={updated} onEdit={onEdit} onDelete={onDelete} />

      <ItemContent content={content} />

      <TagsList tags={tags} />

      <PostActions postId={id} likes={likes} onComment={onComment} />
    </article>
  );
}

export default PostItem;
