import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { ERROR_NO_USER_FOUND, TOKEN_COOKIE_KEY } from '@/consts/auth';
import session from '@/app/api/[utils]/SessionClient';

async function GET() {
  const data = await session.getData();

  if (!data.isLoggedIn) {
    cookies().delete(TOKEN_COOKIE_KEY);
    return NextResponse.json({ error: 'Could not find the user.', code: ERROR_NO_USER_FOUND }, { status: 404 });
  }

  const response = NextResponse.json(data.user);
  response.cookies.set(TOKEN_COOKIE_KEY, data.token);

  return response;
}

export { GET };
