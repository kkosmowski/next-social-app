'use client';

import type { ReactNode } from 'react';

import type { PropsWithChildren } from '@/types/common';
import { useAuth } from '@/contexts/AuthProvider';

type Props =
  | PropsWithChildren<{ content?: undefined }>
  | {
      content: ReactNode;
      children?: undefined;
    };

function LoggedOnly({ content, children }: Props) {
  const { isLoggedIn } = useAuth();

  if (content && children) {
    throw new Error('LoggedOnly Error: Do not pass both content and children');
  }

  if (isLoggedIn) {
    return children ?? content;
  }
  return null;
}

export default LoggedOnly;
