import type { Model } from './common';
import type { User } from './user';
import type { Comment } from './comment';

export type PostLikeDbModel = Model & {
  post: string;
  user: string;
};

export type PostDbModel = Model & {
  title: string;
  content: string;
  user: string;
  tags: string;
};

export type PostLike = Omit<Model, 'updated'> & {
  postId: string;
  userId: string;
};

export type Post = Model & {
  title: string;
  content: string;
  likes: PostLike[];
  user: User;
  comments: Comment[];
  tags: string[];
};

export type PostFormValues = Pick<Post, 'title' | 'content'> & {
  tags: string;
};

export type GetPostsResponse = Post[];
export type AddPostPayload = Pick<Post, 'title' | 'content' | 'tags'>;
export type AddPostResponse = Post;
