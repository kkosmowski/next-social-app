import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import session from '@/app/api/[utils]/SessionClient';
import response from '@/app/api/[consts]/response';
import type { AddCommentPayload } from '@/types/comment';
import { ERROR_INVALID_PAYLOAD, ERROR_RESOURCE_NOT_FOUND } from '@/consts/common';
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

  const payload: AddCommentPayload = await request.json();

  if (!payload.content) {
    return NextResponse.json(
      { error: 'Field content is not valid.', code: ERROR_INVALID_PAYLOAD },
      { status: HttpStatus.BadRequest },
    );
  }

  try {
    const record = await pb.comments.getOne(params.commentId);

    if (record.user !== user.id) {
      return response.forbidden;
    }
  } catch (e) {
    return NextResponse.json({ error: e, code: ERROR_RESOURCE_NOT_FOUND }, { status: HttpStatus.NotFound });
  }

  try {
    const newComment = await pb.comments.update(params.commentId, { content: payload.content }, { expand: 'user' });

    return NextResponse.json(mapCommentRecordToComment(newComment));
  } catch (e) {
    return response.unknownError(e);
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const { isLoggedIn, user, pb } = await session.refreshData(cookies().toString());

  if (!isLoggedIn) {
    return response.unauthorized;
  }

  const { commentId } = params;

  try {
    const record = await pb.comments.getOne(commentId);

    if (record.user !== user.id) {
      return response.forbidden;
    }
  } catch (e) {
    return NextResponse.json({ error: e, code: ERROR_RESOURCE_NOT_FOUND }, { status: HttpStatus.NotFound });
  }

  try {
    await pb.comments.delete(commentId);

    return response.noContent;
  } catch (e) {
    return response.unknownError(e);
  }
}
