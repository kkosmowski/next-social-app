import type { Model } from './common';
import type { User } from './user';

export type CommentDbModel = Model & {
  user: string;
  post: string;
  content: string;
};

export type CommentLikeDbModel = Model & {
  comment: string;
  user: string;
};

export type CommentLike = Omit<Model, 'updated'> & {
  userId: string;
};

export type Comment = Model & {
  postId: string;
  user: User;
  content: string;
  likes: CommentLike[];
};

export type CommentFormValues = AddCommentPayload;

export type AddCommentPayload = Pick<Comment, 'content'>;
export type AddCommentResponse = Comment;
