import type { Model } from '@/types/common';
import type { User } from '@/types/auth';

// should be used only on server side
export type PostLikeModel = Model & {
  post: string;
  user: string;
};

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

export type Post = Model & {
  title: string;
  content: string;
  likes: PostLike[];
  user: User;
  comments: Comment[];
  tags: string[];
};

export type GetPostsResponse = Post[];
