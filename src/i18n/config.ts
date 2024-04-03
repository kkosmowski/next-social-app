import type { Locale, LocaleCode } from '@/types/i18n';

type I18nConfig = {
  locales: Locale[];
  defaultLocale: Locale;
};

export const localeCodes: LocaleCode[] = ['en', 'pl'];

export const i18nConfig: I18nConfig = {
  locales: ['en-US', 'pl-PL'],
  defaultLocale: 'en-US',
};
