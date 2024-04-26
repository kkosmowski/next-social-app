import type { Locale } from '@/types/i18n';

type I18nConfig = {
  locales: Locale[];
  defaultLocale: Locale;
};

export const locales: Locale[] = ['pl', 'en'];
export const defaultLocale = 'en';

export const i18nConfig: I18nConfig = { locales, defaultLocale };
