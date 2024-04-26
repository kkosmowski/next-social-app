import type { ReactNode } from 'react';

import type { TranslationKey } from '@/types/i18n';

export type PropsWithChildren<T = unknown> = T & {
  children: ReactNode;
};

export type ServerComponentProps<T = unknown, P = unknown> = T & {
  params: P & { locale: string };
};

export type Model = {
  id: string;
  created: string;
  updated: string;
};

export type Distinct<T, DistinctName> = T & { __type__: DistinctName };

export type FormErrors<T> = Record<keyof T, TranslationKey | undefined> & { global: TranslationKey | undefined };

export type I18nError = Omit<Error, 'message'> & {
  message: TranslationKey;
};
