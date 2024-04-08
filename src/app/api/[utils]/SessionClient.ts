import type { RecordAuthResponse, RecordModel } from 'pocketbase';

import pb from '@/app/api/pocketbase';

class SessionClient {
  authData: RecordAuthResponse<RecordModel> | null = null;
  _isLoggedIn = false;
  updatedAt: Date | null = null;
  staleTime = 2 * 60 * 1000; // 2 minutes

  isDataFresh() {
    if (!this.updatedAt) return false;

    const now = new Date();
    return this.updatedAt.getTime() + this.staleTime > now.getTime();
  }

  async refreshDataIfNeeded() {
    if (this.authData && this.isDataFresh()) {
      return;
    }

    if (pb.authStore.isValid) {
      this.authData = await pb.users.authRefresh();
      this._isLoggedIn = !!this.authData.token;
      this.updatedAt = new Date();
    } else {
      this.authData = null;
      this._isLoggedIn = false;
      this.updatedAt = null;
      pb.authStore.clear();
    }
  }

  async getData() {
    try {
      await this.refreshDataIfNeeded();

      return this.authData;
    } catch (e) {}
  }

  async isLoggedIn() {
    try {
      await this.refreshDataIfNeeded();

      return this._isLoggedIn;
    } catch (e) {}
  }
}

const session = new SessionClient();

export default session;
