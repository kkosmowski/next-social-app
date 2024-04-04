import type { LocaleCode } from '@/types/i18n';
import { defaultLocaleCode, localeCodes } from '@/i18n/config';

function isValidLocaleCode(code: string): code is LocaleCode {
  // type assertion to avoid TS error, we are not sure yet whether it is Locale or a random string
  return localeCodes.includes(code as LocaleCode);
}

function validateLocaleCode(code: string): LocaleCode {
  return isValidLocaleCode(code) ? code : defaultLocaleCode;
}

export default validateLocaleCode;
