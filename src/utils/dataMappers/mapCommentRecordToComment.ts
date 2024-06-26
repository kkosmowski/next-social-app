import type { RecordModel } from 'pocketbase';

import type { Comment } from '@/types/comment';
import hydrateContent from '@/utils/hydrateContent';
import mapCommentLikeRecordToCommentLike from '@/utils/dataMappers/mapCommentLikeRecordToCommentLike';
import mapSubCommentRecordToSubComment from '@/utils/dataMappers/mapSubCommentRecordToSubComment';

import mapUserRecordToUser from './mapUserRecordToUser';

function mapCommentRecordToComment(record: RecordModel): Comment {
  return {
    id: record.id,
    postId: record.post,
    created: record.created,
    updated: record.updated,
    content: hydrateContent(record.content),
    likes: record.expand?.comment_likes_via_comment?.map(mapCommentLikeRecordToCommentLike) ?? [],
    user: mapUserRecordToUser(record.expand?.user),
    subComments:
      record.expand?.subcomments_via_comment?.map((subComment: RecordModel) =>
        mapSubCommentRecordToSubComment(subComment, record.post),
      ) ?? [],
  };
}

export default mapCommentRecordToComment;
