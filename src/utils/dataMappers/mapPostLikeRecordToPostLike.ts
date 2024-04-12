import type { RecordModel } from 'pocketbase';

import type { PostLike } from '@/types/post';

function mapPostLikeRecordToPostLike(record: RecordModel): PostLike {
  return {
    id: record.id,
    created: record.created,
    postId: String(record.post),
    userId: String(record.user),
  };
}

export default mapPostLikeRecordToPostLike;
