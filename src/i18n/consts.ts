import type { Locale, LocaleCode } from '@/types/i18n';

const codeToLocale: Record<LocaleCode, Locale> = {
  en: 'en-US',
  pl: 'pl-PL',
};

const localeToCode: Record<Locale, LocaleCode> = {
  'en-US': 'en',
  'pl-PL': 'pl',
};

export { codeToLocale, localeToCode };
