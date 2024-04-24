import type { Post } from '@/types/post';
import TagsList from '@/components/TagsList';
import PostActions from '@/components/PostActions';
import PostControls from '@/components/PostControls';
import ItemDetails from '@/components/ItemDetails';
import ItemContent from '@/components/ItemContent';

import styles from './PostItem.module.css';

type Props = Post & {
  onEdit: VoidFunction;
  onComment: VoidFunction;
};

function PostItem(props: Props) {
  const { id, title, content, user, tags, likes, created, onEdit, onComment } = props;

  return (
    <article className={`${styles.wrapper} card`}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <PostControls postId={id} authorId={user.id} onEdit={onEdit} />
      </header>

      <ItemDetails user={user} created={created} />

      <ItemContent content={content} />

      <TagsList tags={tags} />

      <PostActions postId={id} likes={likes} onComment={onComment} />
    </article>
  );
}

export default PostItem;
