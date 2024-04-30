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
import getPostsExpand from '../[utils]/getPostsExpand';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { pb } = await session.refreshData(cookies().toString());

  const postExpand = getPostsExpand();

  const url = new URL(request.url);
  const tag = url.searchParams.get('tagName');

  const posts = await pb.posts.getFullList({
    ...(!!tag && { filter: `tags~'${tag}'` }),
    sort: '-created',
    expand: postExpand,
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
