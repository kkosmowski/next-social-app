import { NextResponse } from 'next/server';

import type { LoginPayload } from '@/types/auth';
import pb from '@/app/api/pocketbase';
import { ERROR_NO_USER_FOUND, TOKEN_COOKIE_KEY } from '@/consts/auth';
import prepareAuth from '@/app/api/[utils]/prepareAuth';

async function POST(request: Request) {
  const payload: LoginPayload = await request.json();

  try {
    const authData = await pb.users.authWithPassword(payload.email, payload.password);
    pb.authStore.save(authData.token, authData.record);
    const data = prepareAuth(authData);

    const response = NextResponse.json(data);
    response.cookies.set(TOKEN_COOKIE_KEY, authData.token);
    return response;
  } catch (e) {
    return NextResponse.json({ error: ERROR_NO_USER_FOUND }, { status: 404 });
  }
}

export { POST };
