import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import session from '@/app/api/[utils]/SessionClient';
import response from '@/app/api/[consts]/response';
import type { DeleteCommentPayload, UpdateCommentPayload } from '@/types/comment';
import { ERROR_RESOURCE_NOT_FOUND } from '@/consts/common';
import { HttpStatus } from '@/consts/api';
import mapCommentRecordToComment from '@/utils/dataMappers/mapCommentRecordToComment';

type Params = {
  params: {
    commentId: string;
  };
};

export async function PATCH(request: NextRequest, { params }: Params) {
  const { isLoggedIn, user, pb } = await session.refreshData(cookies().toString());

  if (!isLoggedIn) {
    return response.unauthorized;
  }

  const payload: UpdateCommentPayload = await request.json();

  if (!payload.content) {
    return response.badRequest<UpdateCommentPayload>(['content']);
  }

  const pbCollection = payload.isSubComment ? pb.subComments : pb.comments;

  try {
    const record = await pbCollection.getOne(params.commentId);

    if (record.user !== user.id) {
      return response.forbidden;
    }
  } catch (e) {
    return NextResponse.json({ error: e, code: ERROR_RESOURCE_NOT_FOUND }, { status: HttpStatus.NotFound });
  }

  try {
    const newComment = await pbCollection.update(params.commentId, { content: payload.content }, { expand: 'user' });

    return NextResponse.json(mapCommentRecordToComment(newComment));
  } catch (e) {
    return response.unknownError(e);
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const { isLoggedIn, user, pb } = await session.refreshData(cookies().toString());

  if (!isLoggedIn) {
    return response.unauthorized;
  }

  const { commentId } = params;

  try {
    const payload: DeleteCommentPayload = await request.json();
    const pbCollection = payload.isSubComment ? pb.subComments : pb.comments;

    try {
      const record = await pbCollection.getOne(commentId);

      if (record.user !== user.id) {
        return response.forbidden;
      }
    } catch (e) {
      return NextResponse.json({ error: e, code: ERROR_RESOURCE_NOT_FOUND }, { status: HttpStatus.NotFound });
    }

    try {
      await pbCollection.delete(commentId);

      return response.noContent;
    } catch (e) {
      return response.unknownError(e);
    }
  } catch (e) {
    return response.badRequest<DeleteCommentPayload>(['isSubComment']);
  }
}
