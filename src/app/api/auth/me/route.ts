import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { PB_AUTH_COOKIE_KEY, IS_LOGGED_COOKIE_KEY } from '@/consts/auth';
import session from '@/app/api/[utils]/SessionClient';
import response from '@/app/api/[consts]/response';

export async function GET() {
  const { isLoggedIn, user } = await session.refreshData(cookies().toString());

  if (!isLoggedIn) {
    session.logout();
    cookies().delete(PB_AUTH_COOKIE_KEY);
    cookies().delete(IS_LOGGED_COOKIE_KEY);
    return response.unauthorized;
  }

  return NextResponse.json(user);
}
