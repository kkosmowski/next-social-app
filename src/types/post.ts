import type { Model } from '@/types/common';
import type { User } from '@/types/auth';

export type PostLike = Omit<Model, 'updated'> & {
  postId: string;
  userId: string;
};

export type Comment = Model & {
  post: Post;
  user: User;
  content: string;
  likes: PostLike[];
};

export type Tag = Omit<Model, 'created' | 'updated'> & {
  name: string;
};

export type Post = Model & {
  title: string;
  content: string;
  likes: PostLike[];
  user: User;
  comments: Comment[];
  tags: Tag[];
};

export type GetPostsResponse = Post[];
