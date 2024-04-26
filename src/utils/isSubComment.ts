import type { Comment, SubComment } from '@/types/comment';

function isSubComment(comment: Comment | SubComment): comment is SubComment {
  return !(comment as Comment).subComments;
}

export default isSubComment;
