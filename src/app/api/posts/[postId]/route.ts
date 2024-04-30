import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import session from '@/app/api/[utils]/SessionClient';
import { ERROR_RESOURCE_NOT_FOUND } from '@/consts/common';
import { HttpStatus } from '@/consts/api';
import validatePostPayload from '@/app/api/[utils]/validatePostPayload';
import mapPostRecordToPost from '@/utils/dataMappers/mapPostRecordToPost';
import type { AddPostPayload } from '@/types/post';
import mapPostToPostRecord from '@/utils/dataMappers/mapPostToPostRecord';
import response from '@/app/api/[consts]/response';
import getPostsExpand from '@/app/api/[utils]/getPostsExpand';

type Params = {
  params: {
    postId: string;
  };
};

export async function GET(request: NextRequest, { params }: Params) {
  const { pb } = await session.refreshData(cookies().toString());
  const { postId } = params;

  try {
    const postsExpand = getPostsExpand();
    const record = await pb.posts.getOne(postId, { expand: postsExpand });

    return NextResponse.json(mapPostRecordToPost(record));
  } catch (e) {
    return NextResponse.json({ error: e, code: ERROR_RESOURCE_NOT_FOUND }, { status: HttpStatus.NotFound });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { isLoggedIn, pb, user } = await session.refreshData(cookies().toString());

  if (!isLoggedIn) {
    return response.unauthorized;
  }

  const { postId } = params;

  const payload: AddPostPayload = await request.json();
  const [isValid, invalidFields] = validatePostPayload(payload);

  if (!isValid) {
    return response.badRequest<AddPostPayload>(invalidFields);
  }

  try {
    const record = await pb.posts.getOne(postId);

    if (record.user !== user.id) {
      return response.forbidden;
    }
  } catch (e) {
    return NextResponse.json({ error: e, code: ERROR_RESOURCE_NOT_FOUND }, { status: HttpStatus.NotFound });
  }

  try {
    const newRecord = await pb.posts.update(postId, mapPostToPostRecord(payload), { expand: 'user' });
    return NextResponse.json(mapPostRecordToPost(newRecord));
  } catch (e) {
    return response.unknownError(e);
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const { isLoggedIn, pb, user } = await session.refreshData(cookies().toString());

  if (!isLoggedIn) {
    return response.unauthorized;
  }

  const { postId } = params;

  try {
    const record = await pb.posts.getOne(postId);

    if (record.user !== user.id) {
      return response.forbidden;
    }
  } catch (e) {
    return NextResponse.json({ error: e, code: ERROR_RESOURCE_NOT_FOUND }, { status: HttpStatus.NotFound });
  }

  try {
    await pb.posts.delete(postId);
    return response.noContent;
  } catch (e) {
    return response.unknownError(e);
  }
}
