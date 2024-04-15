import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import pb from '@/app/api/pocketbase';
import mapUserRecordToUser from '@/utils/dataMappers/mapUserRecordToUser';
import { ERROR_NO_USER_FOUND } from '@/consts/auth';

type Params = {
  params: {
    username: string;
  };
};

export async function GET(_: NextRequest, { params }: Params) {
  if (!params.username) {
    return NextResponse.json({ error: 'No username provided.', code: ERROR_NO_USER_FOUND }, { status: 404 });
  }

  const record = await pb.users.getFirstListItem(`username="${params.username}"`);
  return NextResponse.json(mapUserRecordToUser(record));
}
