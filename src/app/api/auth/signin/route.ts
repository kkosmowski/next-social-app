import { NextResponse } from 'next/server';

import type { LoginPayload } from '@/types/auth';
import { ERROR_INVALID_CREDENTIALS, PB_AUTH_COOKIE_KEY } from '@/consts/auth';
import mapUserRecordToUser from '@/utils/dataMappers/mapUserRecordToUser';
import PocketBase from '@/app/api/pocketbase';
import { HttpStatus } from '@/consts/api';

const getIsLoggedCookie = (exp: string | undefined) => {
  if (!exp) {
    throw new Error('Error: Exported PocketBase cookie has no Exp.');
  }
  return `is_logged=true; Path=/; Expires=${exp}; Secure; SameSite=Strict`;
};

export async function POST(request: Request) {
  const payload: LoginPayload = await request.json();
  const pb = new PocketBase();

  try {
    const authData = await pb.users.authWithPassword(payload.email, payload.password);
    const data = mapUserRecordToUser(authData.record);

    const pbCookie = pb.authStore.exportToCookie({ sameSite: true }, PB_AUTH_COOKIE_KEY);
    const pbCookieExpDateString = pbCookie
      .split('; ')
      .find((substring) => substring.includes('Expires'))
      ?.split('=')[1];
    const finalCookie = [pbCookie, getIsLoggedCookie(pbCookieExpDateString)].join(', ');

    return new NextResponse(JSON.stringify(data), {
      headers: {
        'Set-Cookie': finalCookie,
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: 'Invalid credentials.', code: ERROR_INVALID_CREDENTIALS },
      { status: HttpStatus.NotFound },
    );
  }
}
