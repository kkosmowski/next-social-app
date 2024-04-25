import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import session from '@/app/api/[utils]/SessionClient';
import response from '@/app/api/[consts]/response';
import { HttpStatus } from '@/consts/api';
import type { CommentLikeDbModel } from '@/types/comment';

import Model = models.Model;

type Params = {
  params: {
    commentId: string;
  };
};

export async function POST(_: NextRequest, { params }: Params) {
  const { isLoggedIn, user, pb } = await session.refreshData(cookies().toString());

  if (!isLoggedIn) {
    return response.unauthorized;
  }

  const newLike: Omit<CommentLikeDbModel, keyof Model> = {
    comment: params.commentId,
    user: user.id,
  };

  try {
    const createdLike = await pb.commentLikes.create(newLike);

    return NextResponse.json(createdLike, { status: HttpStatus.Created });
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
    const likeToDelete = await pb.commentLikes.getFirstListItem(`comment="${params.commentId}" && user="${user.id}"`);
    await pb.commentLikes.delete(likeToDelete.id);

    return response.noContent;
  } catch (e) {
    return response.unknownError(e);
  }
}
