import type { ReactNode } from 'react';

import type { IntlShape as _IntlShape } from '@formatjs/intl';
import { createIntl } from '@formatjs/intl';

import type { Locale, LocaleCode, Namespace } from '@/types/i18n';
import { i18nConfig } from '@/i18n/config';
import type { TFunction } from '@/app/utils/tFunction';
import { tFunction } from '@/app/utils/tFunction';
import codeToLocale from '@/i18n/getLocale';
import isValidLocaleCode from '@/i18n/isValidLocaleCode';

type IntlShape = Omit<_IntlShape<ReactNode>, 'locale'> & {
  t: TFunction;
  locale: Locale;
};

async function getIntl(code: LocaleCode, namespace: Namespace): Promise<IntlShape> {
  const locale = isValidLocaleCode(code) ? codeToLocale[code] : i18nConfig.defaultLocale;
  const messages = (await import(`@/i18n/${locale}/${namespace}.json`)).default;

  const intl = createIntl<ReactNode>({ locale, messages });

  return { t: tFunction(intl), ...intl } as unknown as Promise<IntlShape>;
}

export default getIntl;
