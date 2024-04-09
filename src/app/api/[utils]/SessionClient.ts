import pb from '@/app/api/pocketbase';
import prepareAuth from '@/app/api/[utils]/prepareAuth';
import type { UserModel } from '@/types/auth';

type SessionData =
  | {
      user: UserModel;
      token: string;
      isLoggedIn: true;
    }
  | {
      user: null;
      token: null;
      isLoggedIn: false;
    };

const emptySessionData: SessionData = {
  user: null,
  token: null,
  isLoggedIn: false,
};

class SessionClient {
  queued = Promise.resolve(emptySessionData);
  data: SessionData = emptySessionData;
  updatedAt: Date | null = null;
  staleTime = 2 * 60 * 1000; // 2 minutes

  isDataFresh() {
    if (!this.updatedAt) return false;

    const now = new Date();
    return this.updatedAt.getTime() + this.staleTime > now.getTime();
  }

  private queue(fn: () => Promise<SessionData>) {
    return (this.queued = this.queued.then(fn));
  }

  async refreshDataIfNeeded() {
    if (this.data.isLoggedIn && this.isDataFresh()) {
      return;
    }

    if (pb.authStore.isValid) {
      const authData = await pb.users.authRefresh();

      this.data = {
        user: prepareAuth(authData),
        token: authData.token,
        isLoggedIn: true,
      };
      this.updatedAt = new Date();
    } else {
      this.logout();
    }
  }

  async getData() {
    return this.queue(
      () =>
        new Promise<SessionData>(async (resolve) => {
          try {
            await this.refreshDataIfNeeded();

            resolve(this.data);
          } catch (e) {
            resolve(emptySessionData);
          }
        }),
    );
  }

  logout() {
    try {
      this.data = emptySessionData;
      this.updatedAt = null;
      pb.authStore.clear();
    } catch (e) {}
  }
}

const session = new SessionClient();

export default session;
