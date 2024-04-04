import type { ReactNode } from 'react';

import type { PropsWithChildren } from '@/types/common';

type Props =
  | PropsWithChildren<{ content?: undefined }>
  | {
      content: ReactNode;
      children?: undefined;
    };

function GuestOnly({ content, children }: Props) {
  if (content && children) {
    throw new Error('GuestOnly Error: Do not pass both content and children');
  }

  const isLoggedIn = true;

  if (!isLoggedIn) {
    return children ?? content;
  }
  return <></>;
}

export default GuestOnly;
