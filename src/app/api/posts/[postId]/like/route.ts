import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import pb from '@/app/api/pocketbase';
import session from '@/app/api/[utils]/SessionClient';
import { ERROR_NOT_LOGGED_IN } from '@/consts/auth';
import type { PostLikeModel } from '@/types/post';
import type { Model } from '@/types/common';
import mapPostLikeRecordToPostLike from '@/utils/dataMappers/mapPostLikeRecordToPostLike';
import { ERROR_UNKNOWN } from '@/consts/common';

type Params = {
  params: {
    postId: string;
  };
};

export async function POST(_: NextRequest, { params }: Params) {
  const { isLoggedIn, user } = await session.getData();

  if (!isLoggedIn) {
    return NextResponse.json({ error: 'User is not logged in.', code: ERROR_NOT_LOGGED_IN }, { status: 401 });
  }

  const newLike: Omit<PostLikeModel, keyof Model> = {
    user: user.id,
    post: params.postId,
  };

  try {
    const createdLike = await pb.postLikes.create(newLike);

    return new NextResponse(JSON.stringify(mapPostLikeRecordToPostLike(createdLike)), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return NextResponse.json({ error: e, code: ERROR_UNKNOWN }, { status: 400 });
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const { isLoggedIn, user } = await session.getData();

  if (!isLoggedIn) {
    return NextResponse.json({ error: 'User is not logged in.', code: ERROR_NOT_LOGGED_IN }, { status: 401 });
  }

  try {
    const likeToDelete = await pb.postLikes.getFirstListItem(`post="${params.postId}" && user="${user.id}"`);
    await pb.postLikes.delete(likeToDelete.id);

    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    return NextResponse.json({ error: e, code: ERROR_UNKNOWN }, { status: 400 });
  }
}
