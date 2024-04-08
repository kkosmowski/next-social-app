import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { ERROR_NO_USER_FOUND, TOKEN_COOKIE_KEY } from '@/consts/auth';
import prepareAuth from '@/app/api/[utils]/prepareAuth';
import session from '@/app/api/[utils]/SessionClient';

async function GET() {
  const authData = await session.getData();

  if (!authData) {
    cookies().delete(TOKEN_COOKIE_KEY);
    return NextResponse.json({ error: ERROR_NO_USER_FOUND }, { status: 404 });
  }

  const data = prepareAuth(authData);
  const response = NextResponse.json(data);
  response.cookies.set(TOKEN_COOKIE_KEY, authData.token);

  return response;
}

export { GET };
