import type { RecordModel } from 'pocketbase';

import { MAX_POST_CONTENT_URL_LENGTH } from '@/consts/post';
import type { Post } from '@/types/post';

import mapPostLikeRecordToPostLike from './mapPostLikeRecordToPostLike';
import mapUserRecordToUser from './mapUserRecordToUser';

// shortens URL to max characters
function shortenUrl(string: string) {
  if (string.length <= MAX_POST_CONTENT_URL_LENGTH) return string;

  const beginningLength = MAX_POST_CONTENT_URL_LENGTH / 2 - 1;
  const endLength = MAX_POST_CONTENT_URL_LENGTH / 2 - 2;

  const beginning = string.slice(0, beginningLength);
  const end = string.slice(string.length - endLength);

  return `${beginning}...${end}`;
}

function hydrateContent(content: string): string {
  const regex = /http(s)?:\/\/(\S)+/gi;

  return content.replaceAll(
    regex,
    (substring) => `<a href="${substring}" target="_blank">${shortenUrl(substring)}</a>`,
  );
}
function mapPostRecordToPost(record: RecordModel): Post {
  return {
    id: record.id,
    created: record.created,
    updated: record.updated,
    title: record.title,
    content: hydrateContent(record.content),
    likes: record.expand?.post_likes_via_post?.map(mapPostLikeRecordToPostLike) ?? [],
    user: mapUserRecordToUser(record.expand?.user),
    comments: record.expand?.comments ?? [],
    tags: record.tags ? record.tags.split(',') : [],
  };
}

export default mapPostRecordToPost;
