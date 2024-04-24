import type { RecordModel } from 'pocketbase';

import type { Post } from '@/types/post';
import hydrateContent from '@/utils/hydrateContent';
import mapCommentRecordToComment from '@/utils/dataMappers/mapCommentRecordToComment';

import mapPostLikeRecordToPostLike from './mapPostLikeRecordToPostLike';
import mapUserRecordToUser from './mapUserRecordToUser';

function mapPostRecordToPost(record: RecordModel): Post {
  return {
    id: record.id,
    created: record.created,
    updated: record.updated,
    title: record.title,
    content: hydrateContent(record.content),
    likes: record.expand?.post_likes_via_post?.map(mapPostLikeRecordToPostLike) ?? [],
    user: mapUserRecordToUser(record.expand?.user),
    comments: record.expand?.comments_via_post?.map(mapCommentRecordToComment) ?? [],
    tags: record.tags ? record.tags.split(',') : [],
  };
}

export default mapPostRecordToPost;
