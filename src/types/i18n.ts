import type en from '@/i18n/en.json';

export type Locale = 'en-US' | 'pl-PL';
export type LocaleCode = 'en' | 'pl';

export type TranslationKey = keyof typeof en;
