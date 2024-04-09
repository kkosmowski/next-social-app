import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { ERROR_NOT_LOGGED_IN, TOKEN_COOKIE_KEY } from '@/consts/auth';
import session from '@/app/api/[utils]/SessionClient';
import { ERROR_UNKNOWN } from '@/consts/common';

async function POST() {
  const { isLoggedIn } = await session.getData();

  if (!isLoggedIn) {
    return NextResponse.json({ error: 'User is not logged in.', code: ERROR_NOT_LOGGED_IN }, { status: 422 });
  }

  try {
    session.logout();
    const response = NextResponse.json({});
    response.cookies.delete(TOKEN_COOKIE_KEY);
    cookies().delete(TOKEN_COOKIE_KEY);
    return response;
  } catch (e) {
    return NextResponse.json({ error: 'Unknown error during logging out', code: ERROR_UNKNOWN }, { status: 400 });
  }
}

export { POST };
