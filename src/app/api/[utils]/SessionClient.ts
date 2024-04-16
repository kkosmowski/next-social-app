import type { User } from '@/types/user';
import mapUserRecordToUser from '@/utils/dataMappers/mapUserRecordToUser';
import type { Locale, LocaleCode } from '@/types/i18n';
import { codeToLocale, localeToCode } from '@/i18n/consts';
import validateLocaleCode from '@/i18n/validateLocaleCode';
import validateLocale from '@/i18n/validateLocale';
import { defaultLocale, defaultLocaleCode } from '@/i18n/config';
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

type I18nData = {
  locale: Locale;
  localeCode: LocaleCode;
};

const emptySessionData: SessionData = {
  user: null,
  token: null,
  isLoggedIn: false,
  pb: new PocketBase(),
};

const defaultI18n: I18nData = {
  locale: defaultLocale,
  localeCode: defaultLocaleCode,
};

class SessionClient {
  private data: SessionData = emptySessionData;
  private currentI18n = defaultI18n;

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
      this.currentI18n = defaultI18n;
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
