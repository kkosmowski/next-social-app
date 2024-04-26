import type en from '@/i18n/en.json';

export type Locale = 'en' | 'pl';

export type TranslationKey = keyof typeof en;
