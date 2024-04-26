import type { ReactNode } from 'react';

import type { IntlShape as _IntlShape } from '@formatjs/intl';
import { createIntl } from '@formatjs/intl';

import type { Locale } from '@/types/i18n';
import type { TFunction } from '@/app/utils/tFunction';
import { tFunction } from '@/app/utils/tFunction';
import validateLocale from '@/i18n/validateLocale';

type IntlShape = Omit<_IntlShape<ReactNode>, 'locale'> & {
  t: TFunction;
  locale: Locale;
};

async function getIntl(localeString: string): Promise<IntlShape> {
  const locale = validateLocale(localeString);

  const messages = (await import(`@/i18n/${locale}.json`)).default;
  const intl = createIntl<ReactNode>({ locale, messages });

  return { t: tFunction(intl), ...intl } as unknown as Promise<IntlShape>;
}

export default getIntl;
