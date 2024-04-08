import { cookies } from 'next/headers';
import type { RecordAuthResponse, RecordModel } from 'pocketbase';

import { POCKETBASE_URL } from '@/app/api/env';
import { TOKEN_COOKIE_KEY } from '@/consts/auth';
import type { UserModel } from '@/types/auth';

function buildAvatarUrl(authData: RecordModel) {
  return POCKETBASE_URL + '/api/files/' + authData.collectionName + '/' + authData.id + '/' + authData.avatar;
}

function prepareAuth(authData: RecordAuthResponse<RecordModel>) {
  const data: UserModel = {
    id: authData.record.id,
    email: authData.record.email,
    username: authData.record.username,
    verified: authData.record.verified,
    created: authData.record.created,
    avatarUrl: buildAvatarUrl(authData.record),
  };
  cookies().set(TOKEN_COOKIE_KEY, authData.token);
  return data;
}

export default prepareAuth;
