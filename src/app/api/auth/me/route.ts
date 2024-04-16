import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { ERROR_NOT_AUTHORIZED, PB_AUTH_COOKIE_KEY, IS_LOGGED_COOKIE_KEY } from '@/consts/auth';
import session from '@/app/api/[utils]/SessionClient';

export async function GET() {
  const { isLoggedIn, user } = await session.refreshData(cookies().toString());

  if (!isLoggedIn) {
    session.logout();
    cookies().delete(PB_AUTH_COOKIE_KEY);
    cookies().delete(IS_LOGGED_COOKIE_KEY);
    return NextResponse.json({ error: 'You are not logged in.', code: ERROR_NOT_AUTHORIZED }, { status: 401 });
  }

  return NextResponse.json(user);
}
