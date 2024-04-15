import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import type { LoginPayload } from '@/types/auth';
import pb from '@/app/api/pocketbase';
import { ERROR_INVALID_CREDENTIALS, TOKEN_COOKIE_KEY } from '@/consts/auth';
import mapUserRecordToUser from '@/utils/dataMappers/mapUserRecordToUser';

export async function POST(request: Request) {
  const payload: LoginPayload = await request.json();

  try {
    const authData = await pb.users.authWithPassword(payload.email, payload.password);
    pb.authStore.save(authData.token, authData.record);
    const data = mapUserRecordToUser(authData.record);

    cookies().set(TOKEN_COOKIE_KEY, authData.token);
    const response = NextResponse.json(data);
    response.cookies.set(TOKEN_COOKIE_KEY, authData.token);
    return response;
  } catch (e) {
    return NextResponse.json({ error: 'Invalid credentials.', code: ERROR_INVALID_CREDENTIALS }, { status: 404 });
  }
}
