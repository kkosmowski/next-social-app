import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import type { AddPostPayload, Post } from '@/types/post';
import mapPostRecordToPost from '@/utils/dataMappers/mapPostRecordToPost';
import session from '@/app/api/[utils]/SessionClient';
import { HttpStatus } from '@/consts/api';
import validatePostPayload from '@/app/api/[utils]/validatePostPayload';
import { ERROR_INVALID_PAYLOAD } from '@/consts/common';
import mapPostToPostRecord from '@/utils/dataMappers/mapPostToPostRecord';
import response from '@/app/api/[consts]/response';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { pb } = await session.refreshData(cookies().toString());

  const posts = await pb.posts.getFullList({
    sort: '-created',
    expand: 'user, post_likes_via_post, comments_via_post.user, comments_via_post.comment_likes_via_comment',
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
  const [isValid, validationError] = validatePostPayload(payload);

  if (!isValid) {
    return NextResponse.json(
      { error: validationError, code: ERROR_INVALID_PAYLOAD },
      { status: HttpStatus.BadRequest },
    );
  }

  const data = mapPostToPostRecord({ ...payload, user });

  try {
    const record = await pb.posts.create(data, { expand: 'user' });
    const post = mapPostRecordToPost(record);

    return new NextResponse(JSON.stringify(post), {
      status: HttpStatus.Created,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return response.unknownError(e);
  }
}
