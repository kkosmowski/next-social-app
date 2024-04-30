import api from '@/api';
import endpoints from '@/consts/endpoints';
import type { GetPostsResponse } from '@/types/post';
import PostItem from '@/components/PostItem';
import PostsFeedHeader from '../PostsFeedHeader';
import PostItemSimplified from '@/components/PostItemSimplified';

import styles from './PostsFeed.module.css';

async function getPosts(params?: Props['params']) {
  return api.get<GetPostsResponse>(endpoints.posts, { params });
}

type Props = {
  hideHeader?: boolean;
  simplified?: boolean;
  small?: boolean;
  params?: Record<string, string>;
};

async function PostsFeed({ simplified, small, hideHeader, params }: Props) {
  const posts = await getPosts(params);

  return (
    <section className={styles.wrapper}>
      {!hideHeader && <PostsFeedHeader key="title" />}

      {posts.map((post) =>
        simplified ? (
          <PostItemSimplified small={small} key={post.id} {...post} />
        ) : (
          <PostItem key={post.id} {...post} />
        ),
      )}
    </section>
  );
}

export default PostsFeed;
