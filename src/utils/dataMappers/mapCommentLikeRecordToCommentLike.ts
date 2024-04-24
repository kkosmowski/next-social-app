import type { RecordModel } from 'pocketbase';

import type { CommentLike } from '@/types/post';

function mapCommentLikeRecordToCommentLike(record: RecordModel): CommentLike {
  return {
    id: record.id,
    created: record.created,
    userId: String(record.user),
  };
}

export default mapCommentLikeRecordToCommentLike;
