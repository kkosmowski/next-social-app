import type { ReactNode } from 'react';

export type PropsWithChildren<T = unknown> = T & {
  children: ReactNode;
};

export type PageProps<T = unknown, P = unknown> = T & {
  params: P & { localeCode: string };
};

export type Model = {
  id: string;
  created: string;
  updated: string;
};

export type Distinct<T, DistinctName> = T & { __type__: DistinctName };
