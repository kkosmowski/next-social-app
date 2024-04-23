import Link from 'next/link';

import type { Post } from '@/types/post';
import formatDate from '@/utils/formatDate';
import TagsList from '@/components/TagsList';
import PostActions from '@/components/PostActions';
import dynamicRoute from '@/app/utils/dynamicRoute';
import { Routes } from '@/consts/navigation';
import PostControls from '@/components/PostControls';

import styles from './PostItem.module.css';

async function PostItem(props: Post) {
  return (
    <article className={styles.wrapper}>
      <header className={styles.header}>
        <h3 className={styles.title}>{props.title}</h3>
        <PostControls postId={props.id} authorId={props.user.id} />
      </header>

      <section className={styles.details}>
        <address className={styles.author}>
          <Link href={dynamicRoute(Routes.user, { username: props.user.username })}>{props.user.username}</Link>
        </address>
        <time className={styles.date}>{formatDate(props.created, 'd-MM-yyyy hh:mm')}</time>
      </section>

      <p className={styles.content} dangerouslySetInnerHTML={{ __html: props.content }} />

      <TagsList tags={props.tags} />

      <PostActions postId={props.id} likes={props.likes} />
    </article>
  );
}

export default PostItem;
