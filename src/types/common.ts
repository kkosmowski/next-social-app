import type { ReactNode } from 'react';

export type PropsWithChildren<T = unknown> = T & {
  children: ReactNode;
};
