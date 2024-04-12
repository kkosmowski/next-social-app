import { NextResponse } from 'next/server';

import pb from '@/app/api/pocketbase';
import type { Post } from '@/types/post';
import { MAX_POST_CONTENT_URL_LENGTH } from '@/consts/post';
import mapUserRecordToUser from '@/utils/dataMappers/mapUserRecordToUser';
import mapPostLikeRecordToPostLike from '@/utils/dataMappers/mapPostLikeRecordToPostLike';

export const dynamic = 'force-dynamic';

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

async function GET() {
  const posts = await pb.posts.getFullList({
    sort: '-created',
    expand: 'comments,likes,post_likes_via_post,user,tags',
  });

  const mappedPosts: Post[] = posts.map((post) => ({
    id: post.id,
    created: post.created,
    updated: post.updated,
    title: post.title,
    content: hydrateContent(post.content),
    likes: post.expand?.post_likes_via_post?.map(mapPostLikeRecordToPostLike) ?? [],
    user: mapUserRecordToUser(post.expand?.user),
    comments: post.expand?.comments ?? [],
    tags: post.expand?.tags ?? [],
  }));

  return NextResponse.json(mappedPosts);
}

export { GET };
