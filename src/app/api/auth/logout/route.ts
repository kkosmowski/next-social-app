import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { ERROR_NOT_LOGGED_IN, IS_LOGGED_COOKIE_KEY, PB_AUTH_COOKIE_KEY } from '@/consts/auth';
import session from '@/app/api/[utils]/SessionClient';
import { ERROR_UNKNOWN } from '@/consts/common';

export async function POST() {
  const { isLoggedIn } = await session.refreshData(cookies().toString());

  if (!isLoggedIn) {
    return NextResponse.json({ error: 'User is not logged in.', code: ERROR_NOT_LOGGED_IN }, { status: 422 });
  }

  try {
    session.logout();
    cookies().delete(PB_AUTH_COOKIE_KEY);
    cookies().delete(IS_LOGGED_COOKIE_KEY);
    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    return NextResponse.json({ error: 'Unknown error during logging out', code: ERROR_UNKNOWN }, { status: 400 });
  }
}
