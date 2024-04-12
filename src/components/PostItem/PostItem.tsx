import type { Post } from '@/types/post';
import formatDate from '@/utils/formatDate';
import TagsList from '@/components/TagsList';
import PostActions from '@/components/PostActions';

import styles from './PostItem.module.css';

async function PostItem(props: Post) {
  // console.log(props);
  return (
    <article className={styles.wrapper}>
      <header>
        <h4 className={styles.title}>{props.title}</h4>
      </header>

      <section className={styles.details}>
        <address className={styles.author}>{props.user.username}</address>
        <time className={styles.date}>{formatDate(props.created, 'd-MM-yyyy hh:mm')}</time>
      </section>

      <p className={styles.content} dangerouslySetInnerHTML={{ __html: props.content }} />

      <TagsList tags={props.tags} />

      <PostActions likes={props.likes} />
    </article>
  );
}

export default PostItem;
