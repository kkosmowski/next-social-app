import type { ReactNode } from 'react';

import type { PropsWithChildren } from '@/types/common';

type Props =
  | PropsWithChildren<{ content?: undefined }>
  | {
      content: ReactNode;
      children?: undefined;
    };

function LoggedOnly({ content, children }: Props) {
  if (content && children) {
    throw new Error('LoggedOnly Error: Do not pass both content and children');
  }
  const isLoggedIn = true;

  if (isLoggedIn) {
    return children ?? content;
  }
  return null;
}

export default LoggedOnly;
