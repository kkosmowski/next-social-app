import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import session from '@/app/api/[utils]/SessionClient';
import type { Model } from '@/types/common';
import { ERROR_INVALID_PAYLOAD } from '@/consts/common';
import { HttpStatus } from '@/consts/api';
import type { AddCommentPayload, SubCommentDbModel } from '@/types/comment';
import mapCommentRecordToComment from '@/utils/dataMappers/mapCommentRecordToComment';
import response from '@/app/api/[consts]/response';

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

  const payload: AddCommentPayload = await request.json();

  if (!payload.content) {
    return NextResponse.json(
      { error: 'Field content is not valid.', code: ERROR_INVALID_PAYLOAD },
      { status: HttpStatus.BadRequest },
    );
  }

  const commentData: Omit<SubCommentDbModel, keyof Model> = {
    user: user.id,
    comment: params.commentId,
    content: payload.content,
  };

  try {
    const comment = await pb.subComments.create(commentData, { expand: 'user, subcomment_likes_via_comment' });

    return NextResponse.json(mapCommentRecordToComment(comment), { status: HttpStatus.Created });
  } catch (e) {
    return response.unknownError(e);
  }
}
