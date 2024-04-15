import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { ERROR_NOT_AUTHORIZED, TOKEN_COOKIE_KEY } from '@/consts/auth';
import session from '@/app/api/[utils]/SessionClient';

export async function GET() {
  const data = await session.getData();

  if (!data.isLoggedIn) {
    session.logout();
    cookies().delete(TOKEN_COOKIE_KEY);
    return NextResponse.json({ error: 'You are not logged in.', code: ERROR_NOT_AUTHORIZED }, { status: 401 });
  }

  const response = NextResponse.json(data.user);
  response.cookies.set(TOKEN_COOKIE_KEY, data.token);

  return response;
}
