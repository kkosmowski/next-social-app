import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import session from '@/app/api/[utils]/SessionClient';
import type { Model } from '@/types/common';
import { ERROR_INVALID_PAYLOAD } from '@/consts/common';
import { HttpStatus } from '@/consts/api';
import type { AddCommentPayload, CommentDbModel } from '@/types/comment';
import mapCommentRecordToComment from '@/utils/dataMappers/mapCommentRecordToComment';
import response from '@/app/api/[consts]/response';

type Params = {
  params: {
    postId: string;
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

  const commentData: Omit<CommentDbModel, keyof Model> = {
    user: user.id,
    post: params.postId,
    content: payload.content,
  };

  try {
    const comment = await pb.comments.create(commentData, { expand: 'user, comment_likes_via_comment' });

    return NextResponse.json(mapCommentRecordToComment(comment), { status: HttpStatus.Created });
  } catch (e) {
    return response.unknownError(e);
  }
}
