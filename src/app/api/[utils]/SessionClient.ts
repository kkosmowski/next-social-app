import type { User } from '@/types/user';
import mapUserRecordToUser from '@/utils/dataMappers/mapUserRecordToUser';
import PocketBase from '@/app/api/pocketbase';
import { PB_AUTH_COOKIE_KEY } from '@/consts/auth';

type SessionData =
  | {
      user: User;
      token: string;
      isLoggedIn: true;
      pb: PocketBase;
    }
  | {
      user: null;
      token: null;
      isLoggedIn: false;
      pb: PocketBase;
    };

const emptySessionData: SessionData = {
  user: null,
  token: null,
  isLoggedIn: false,
  pb: new PocketBase(),
};

class SessionClient {
  private data: SessionData = emptySessionData;

  async refreshData(cookies: string | string[]) {
    const pb = new PocketBase();

    const cookie =
      typeof cookies === 'string' ? cookies : cookies.find((string) => string.includes(PB_AUTH_COOKIE_KEY));

    if (!cookie) {
      this.data = emptySessionData;
      return emptySessionData;
    }

    pb.authStore.loadFromCookie(cookie);

    if (!pb.authStore.isValid) {
      this.data = emptySessionData;
      return emptySessionData;
    }

    const authData = await pb.users.authRefresh();

    this.data = {
      user: mapUserRecordToUser(authData.record),
      token: authData.token,
      isLoggedIn: true,
      pb,
    };

    return this.data;
  }

  logout() {
    try {
      this.data = emptySessionData;
    } catch (e) {}
  }
}

const session = new SessionClient();

export default session;
