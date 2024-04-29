import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import type { AddPostPayload, Post } from '@/types/post';
import mapPostRecordToPost from '@/utils/dataMappers/mapPostRecordToPost';
import session from '@/app/api/[utils]/SessionClient';
import { HttpStatus } from '@/consts/api';
import validatePostPayload from '@/app/api/[utils]/validatePostPayload';
import mapPostToPostRecord from '@/utils/dataMappers/mapPostToPostRecord';
import response from '@/app/api/[consts]/response';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { pb } = await session.refreshData(cookies().toString());

  const postLikes = 'post_likes_via_post';
  const comments = 'comments_via_post';
  const commentLikes = `${comments}.comment_likes_via_comment`;
  const subComments = `${comments}.subcomments_via_comment`;
  const subCommentLikes = `${subComments}.subcomment_likes_via_comment`;

  const posts = await pb.posts.getFullList({
    sort: '-created',
    expand: `user, ${postLikes}, ${comments}.user, ${commentLikes}, ${subComments}.user, ${subCommentLikes}`,
  });

  const mappedPosts: Post[] = posts.map(mapPostRecordToPost);
  return NextResponse.json(mappedPosts);
}

export async function POST(request: NextRequest) {
  const { pb, isLoggedIn, user } = await session.refreshData(cookies().toString());

  if (!isLoggedIn) {
    return response.unauthorized;
  }

  const payload: AddPostPayload = await request.json();
  const [isValid, invalidFields] = validatePostPayload(payload);

  if (!isValid) {
    return response.badRequest<AddPostPayload>(invalidFields);
  }

  const data = mapPostToPostRecord({ ...payload, user });

  try {
    const record = await pb.posts.create(data, { expand: 'user' });
    const post = mapPostRecordToPost(record);

    return NextResponse.json(post, { status: HttpStatus.Created });
  } catch (e) {
    return response.unknownError(e);
  }
}
