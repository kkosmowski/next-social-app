import _PocketBase from 'pocketbase';

import { POCKETBASE_URL } from '@/app/api/env';

// extends client with custom methods for easier, personalized usage
class PocketBase extends _PocketBase {
  constructor() {
    super(POCKETBASE_URL);
  }

  get users() {
    return this.collection('users');
  }

  get posts() {
    return this.collection('posts');
  }

  get postLikes() {
    return this.collection('post_likes');
  }

  get comments() {
    return this.collection('comments');
  }

  get commentLikes() {
    return this.collection('comment_likes');
  }
}

export default PocketBase;
