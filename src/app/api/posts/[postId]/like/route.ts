import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import session from '@/app/api/[utils]/SessionClient';
import type { PostLikeDbModel } from '@/types/post';
import type { Model } from '@/types/common';
import mapPostLikeRecordToPostLike from '@/utils/dataMappers/mapPostLikeRecordToPostLike';
import { HttpStatus } from '@/consts/api';
import response from '@/app/api/[consts]/response';

type Params = {
  params: {
    postId: string;
  };
};

export async function POST(_: NextRequest, { params }: Params) {
  const { isLoggedIn, user, pb } = await session.refreshData(cookies().toString());

  if (!isLoggedIn) {
    return response.unauthorized;
  }

  const newLike: Omit<PostLikeDbModel, keyof Model> = {
    user: user.id,
    post: params.postId,
  };

  try {
    const createdLike = await pb.postLikes.create(newLike);

    return new NextResponse(JSON.stringify(mapPostLikeRecordToPostLike(createdLike)), {
      status: HttpStatus.Created,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return response.unknownError(e);
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const { isLoggedIn, user, pb } = await session.refreshData(cookies().toString());

  if (!isLoggedIn) {
    return response.unauthorized;
  }

  try {
    const likeToDelete = await pb.postLikes.getFirstListItem(`post="${params.postId}" && user="${user.id}"`);
    await pb.postLikes.delete(likeToDelete.id);

    return response.noContent;
  } catch (e) {
    return response.unknownError(e);
  }
}
