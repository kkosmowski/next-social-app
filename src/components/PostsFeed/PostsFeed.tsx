import api from '@/api';
import endpoints from '@/consts/endpoints';
import type { GetPostsResponse } from '@/types/post';
import PostItem from '@/components/PostItem';

import styles from './PostsFeed.module.css';

async function getPosts() {
  return api.get<GetPostsResponse>(endpoints.posts);
}

async function PostsFeed() {
  const posts = await getPosts();

  return (
    <section className={styles.wrapper}>
      {posts.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </section>
  );
}

export default PostsFeed;
