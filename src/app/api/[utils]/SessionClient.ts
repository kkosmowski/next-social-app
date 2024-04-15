import pb from '@/app/api/pocketbase';
import type { User } from '@/types/user';
import mapUserRecordToUser from '@/utils/dataMappers/mapUserRecordToUser';
import type { Locale, LocaleCode } from '@/types/i18n';
import { codeToLocale, localeToCode } from '@/i18n/consts';
import validateLocaleCode from '@/i18n/validateLocaleCode';
import validateLocale from '@/i18n/validateLocale';
import { defaultLocale, defaultLocaleCode } from '@/i18n/config';

type SessionData =
  | {
      user: User;
      token: string;
      isLoggedIn: true;
    }
  | {
      user: null;
      token: null;
      isLoggedIn: false;
    };

type I18nData = {
  locale: Locale;
  localeCode: LocaleCode;
};

const emptySessionData: SessionData = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const defaultI18n: I18nData = {
  locale: defaultLocale,
  localeCode: defaultLocaleCode,
};

class SessionClient {
  private queued = Promise.resolve(emptySessionData);
  private data: SessionData = emptySessionData;
  private updatedAt: Date | null = null;
  private readonly staleTime = 30 * 60 * 1000; // 30 minutes
  private currentI18n = defaultI18n;

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
        user: mapUserRecordToUser(authData.record),
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

  setI18n({ locale, localeCode }: { locale?: string; localeCode?: string }) {
    if ((locale === undefined || locale == '') && (localeCode === undefined || localeCode === '')) {
      throw new Error('setI18n Error: Please provide at least one – locale or localeCode.');
    }

    // if no locale then there has to be localeCode, otherwise first if would throw error
    const _locale: Locale = locale ? validateLocale(locale) : codeToLocale[validateLocaleCode(localeCode as string)];
    const _localeCode: LocaleCode = localeCode ? validateLocaleCode(localeCode) : localeToCode[_locale];

    if (_locale !== codeToLocale[_localeCode]) {
      throw new Error('setI18n Error: locale and localeCode mismatch. Please ensure both point to the same language.');
    }

    this.currentI18n = {
      locale: _locale,
      localeCode: _localeCode,
    };
  }

  getLocale() {
    return this.currentI18n.locale;
  }

  getLocaleCode() {
    return this.currentI18n.localeCode;
  }

  getI18n() {
    return this.currentI18n;
  }
}

const session = new SessionClient();

export default session;
