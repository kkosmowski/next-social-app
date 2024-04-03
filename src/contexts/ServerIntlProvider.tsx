'use client';

import type { ResolvedIntlConfig } from '@formatjs/intl';
import { IntlProvider } from 'react-intl';

import type { PropsWithChildren } from '@/types/common';
import type { Locale } from '@/types/i18n';

type Props = {
  messages: ResolvedIntlConfig['messages'];
  locale: Locale;
};

function ServerIntlProvider({ messages, locale, children }: PropsWithChildren<Props>) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}

export default ServerIntlProvider;
