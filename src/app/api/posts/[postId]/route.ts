import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { RecordModel } from 'pocketbase';

import session from '@/app/api/[utils]/SessionClient';
import { ERROR_NOT_LOGGED_IN } from '@/consts/auth';
import { ERROR_FORBIDDEN_ACTION, ERROR_RESOURCE_NOT_FOUND, ERROR_UNKNOWN } from '@/consts/common';
import { HttpStatus } from '@/consts/api';

type Params = {
  params: {
    postId: string;
  };
};

export async function DELETE(_: Request, { params }: Params) {
  const { isLoggedIn, pb, user } = await session.refreshData(cookies().toString());

  if (!isLoggedIn) {
    return NextResponse.json(
      { error: 'User is not logged in.', code: ERROR_NOT_LOGGED_IN },
      { status: HttpStatus.Unauthorized },
    );
  }

  const { postId } = params;

  let record: RecordModel;

  try {
    record = await pb.posts.getOne(postId);
  } catch (e) {
    return NextResponse.json({ error: e, code: ERROR_RESOURCE_NOT_FOUND }, { status: HttpStatus.NotFound });
  }

  if (record.user !== user.id) {
    return NextResponse.json(
      { error: 'Forbidden action. Lack of permissions.', code: ERROR_FORBIDDEN_ACTION },
      { status: HttpStatus.Forbidden },
    );
  }

  try {
    await pb.posts.delete(postId);
    return new NextResponse(undefined, { status: HttpStatus.NoContent });
  } catch (e) {
    return NextResponse.json({ error: e, code: ERROR_UNKNOWN }, { status: HttpStatus.InternalServerError });
  }
}
