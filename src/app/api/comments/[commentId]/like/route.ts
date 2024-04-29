import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import session from '@/app/api/[utils]/SessionClient';
import response from '@/app/api/[consts]/response';
import { HttpStatus } from '@/consts/api';
import type { CommentLikeDbModel, LikeCommentPayload } from '@/types/comment';

import Model = models.Model;

type Params = {
  params: {
    commentId: string;
  };
};

export async function POST(request: NextRequest, { params }: Params) {
  const { isLoggedIn, user, pb } = await session.refreshData(cookies().toString());

  if (!isLoggedIn) {
    return response.unauthorized;
  }

  const newLike: Omit<CommentLikeDbModel, keyof Model> = {
    comment: params.commentId,
    user: user.id,
  };

  try {
    const payload: LikeCommentPayload = await request.json();
    const pbCollection = payload.isSubComment ? pb.subCommentLikes : pb.commentLikes;

    try {
      const createdLike = await pbCollection.create(newLike);

      return NextResponse.json(createdLike, { status: HttpStatus.Created });
    } catch (e) {
      return response.unknownError(e);
    }
  } catch (e) {
    return response.badRequest<LikeCommentPayload>(['isSubComment']);
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const { isLoggedIn, user, pb } = await session.refreshData(cookies().toString());

  if (!isLoggedIn) {
    return response.unauthorized;
  }

  const payload: LikeCommentPayload = await request.json();
  const pbCollection = payload.isSubComment ? pb.subCommentLikes : pb.commentLikes;

  try {
    const likeToDelete = await pbCollection.getFirstListItem(`comment="${params.commentId}" && user="${user.id}"`);
    await pbCollection.delete(likeToDelete.id);

    return response.noContent;
  } catch (e) {
    return response.unknownError(e);
  }
}
