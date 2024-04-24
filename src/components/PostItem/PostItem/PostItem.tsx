import Link from 'next/link';

import type { Post } from '@/types/post';
import formatDate from '@/utils/formatDate';
import TagsList from '@/components/TagsList';
import PostActions from '@/components/PostActions';
import dynamicRoute from '@/app/utils/dynamicRoute';
import { Routes } from '@/consts/navigation';
import PostControls from '@/components/PostControls';

import styles from './PostItem.module.css';

type Props = Post & {
  onEdit: VoidFunction;
};

function PostItem(props: Props) {
  const { id, title, content, user, tags, likes, created, onEdit } = props;

  return (
    <article className={styles.wrapper}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <PostControls postId={id} authorId={user.id} onEdit={onEdit} />
      </header>

      <section className={styles.details}>
        <address className={styles.author}>
          <Link href={dynamicRoute(Routes.user, { username: user.username })}>{user.username}</Link>
        </address>
        <time className={styles.date}>{formatDate(created, 'd-MM-yyyy hh:mm')}</time>
      </section>

      <p className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />

      <TagsList tags={tags} />

      <PostActions postId={id} likes={likes} />
    </article>
  );
}

export default PostItem;
