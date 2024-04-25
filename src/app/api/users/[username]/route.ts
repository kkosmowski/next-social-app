import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import mapUserRecordToUser from '@/utils/dataMappers/mapUserRecordToUser';
import { ERROR_NO_USER_FOUND } from '@/consts/auth';
import session from '@/app/api/[utils]/SessionClient';
import { HttpStatus } from '@/consts/api';
import response from '@/app/api/[consts]/response';

type Params = {
  params: {
    username: string;
  };
};

export async function GET(_: NextRequest, { params }: Params) {
  const { pb } = await session.refreshData(cookies().toString());

  if (!params.username) {
    return NextResponse.json(
      { error: 'No username provided.', code: ERROR_NO_USER_FOUND },
      { status: HttpStatus.NotFound },
    );
  }

  try {
    const record = await pb.users.getFirstListItem(`username="${params.username}"`);
    return NextResponse.json(mapUserRecordToUser(record));
  } catch (e) {
    return response.unknownError(e);
  }
}
