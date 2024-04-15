import type { Locale, LocaleCode } from '@/types/i18n';
import { codeToLocale } from '@/i18n/consts';

type I18nConfig = {
  locales: Locale[];
  defaultLocale: Locale;
};

export const localeCodes: LocaleCode[] = ['en', 'pl'];
export const locales: Locale[] = localeCodes.map((code) => codeToLocale[code]);
export const defaultLocaleCode: LocaleCode = 'en';
export const defaultLocale = codeToLocale[defaultLocaleCode];

export const i18nConfig: I18nConfig = { locales, defaultLocale };
