import type { Locale } from '@/types/i18n';
import { defaultLocale, locales } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  // type assertion to avoid TS error, we are not sure yet whether it is Locale or a random string
  return locales.includes(locale as Locale);
}

function validateLocale(locale: string): Locale {
  return isValidLocale(locale) ? locale : defaultLocale;
}

export default validateLocale;
