import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import session from '@/app/api/[utils]/SessionClient';
import { ERROR_NOT_LOGGED_IN } from '@/consts/auth';
import type { Model } from '@/types/common';
import { ERROR_INVALID_PAYLOAD, ERROR_UNKNOWN } from '@/consts/common';
import { HttpStatus } from '@/consts/api';
import type { AddCommentPayload, CommentDbModel } from '@/types/comment';
import mapCommentRecordToComment from '@/utils/dataMappers/mapCommentRecordToComment';

type Params = {
  params: {
    postId: string;
  };
};

export async function POST(request: NextRequest, { params }: Params) {
  const { isLoggedIn, user, pb } = await session.refreshData(cookies().toString());

  if (!isLoggedIn) {
    return NextResponse.json(
      { error: 'User is not logged in.', code: ERROR_NOT_LOGGED_IN },
      { status: HttpStatus.Unauthorized },
    );
  }

  const payload: AddCommentPayload = await request.json();

  if (!payload.content) {
    return NextResponse.json(
      { error: 'Field content is not valid.', code: ERROR_INVALID_PAYLOAD },
      { status: HttpStatus.BadRequest },
    );
  }

  const commentData: Omit<CommentDbModel, keyof Model> = {
    user: user.id,
    post: params.postId,
    content: payload.content,
  };

  try {
    const comment = await pb.comments.create(commentData, { expand: 'user, comment_likes_via_comment' });

    return new NextResponse(JSON.stringify(mapCommentRecordToComment(comment)), {
      status: HttpStatus.Created,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return NextResponse.json({ error: e, code: ERROR_UNKNOWN }, { status: HttpStatus.InternalServerError });
  }
}
