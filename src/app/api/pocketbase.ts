import PocketBase from 'pocketbase';

import { POCKETBASE_URL } from '@/app/api/env';

export const pbClient = new PocketBase(POCKETBASE_URL);

const pb = {
  authStore: pbClient.authStore,
  users: pbClient.collection('users'),
  posts: pbClient.collection('posts'),
  postLikes: pbClient.collection('post_likes'),
  comments: pbClient.collection('comments'),
  commentLikes: pbClient.collection('comment_likes'),
  tags: pbClient.collection('tags'),
};

export default pb;
