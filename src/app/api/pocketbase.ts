import PocketBase from 'pocketbase';

import { POCKETBASE_URL } from '@/app/api/env';

export const pbClient = new PocketBase(POCKETBASE_URL);

const pb = {
  authStore: pbClient.authStore,
  users: pbClient.collection('users'),
};

export default pb;
