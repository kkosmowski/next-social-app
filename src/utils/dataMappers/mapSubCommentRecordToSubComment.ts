import type { RecordModel } from 'pocketbase';

import type { SubComment } from '@/types/comment';
import hydrateContent from '@/utils/hydrateContent';
import mapCommentLikeRecordToCommentLike from '@/utils/dataMappers/mapCommentLikeRecordToCommentLike';

import mapUserRecordToUser from './mapUserRecordToUser';

function mapSubCommentRecordToSubComment(record: RecordModel, postId: string): SubComment {
  return {
    id: record.id,
    postId,
    commentId: record.comment,
    created: record.created,
    updated: record.updated,
    content: hydrateContent(record.content),
    likes: record.expand?.subcomment_likes_via_comment?.map(mapCommentLikeRecordToCommentLike) ?? [],
    user: mapUserRecordToUser(record.expand?.user),
  };
}

export default mapSubCommentRecordToSubComment;
