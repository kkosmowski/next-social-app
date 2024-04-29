import type { Model } from './common';
import type { User } from './user';

export type CommentDbModel = Model & {
  user: string;
  post: string;
  content: string;
};

export type SubCommentDbModel = Model & {
  user: string;
  comment: string;
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
  subComments: SubComment[];
};

export type SubComment = Omit<Comment, 'postId' | 'subComments'> & {
  commentId: string;
};

export type CommentFormValues = AddCommentPayload;

export type AddCommentPayload = Pick<Comment, 'content'>;
export type AddCommentResponse = Comment;

export type UpdateCommentPayload = AddCommentPayload & {
  isSubComment: boolean;
};
export type UpdateCommentResponse = Comment;

export type LikeCommentPayload = {
  isSubComment: boolean;
};

export type DeleteCommentPayload = {
  isSubComment: boolean;
};
