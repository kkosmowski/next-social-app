import type { ReactNode } from 'react';

import type { IntlShape as _IntlShape } from '@formatjs/intl';
import { createIntl } from '@formatjs/intl';

import type { Locale, LocaleCode } from '@/types/i18n';
import type { TFunction } from '@/app/utils/tFunction';
import { tFunction } from '@/app/utils/tFunction';
import { codeToLocale } from '@/i18n/consts';
import validateLocaleCode from '@/i18n/validateLocaleCode';

type IntlShape = Omit<_IntlShape<ReactNode>, 'locale'> & {
  t: TFunction;
  locale: Locale;
  localeCode: LocaleCode;
};

async function getIntl(code: string): Promise<IntlShape> {
  const localeCode = validateLocaleCode(code);
  const locale = codeToLocale[localeCode];

  const messages = (await import(`@/i18n/${localeCode}.json`)).default;
  const intl = createIntl<ReactNode>({ locale, messages });

  return { t: tFunction(intl), localeCode, ...intl } as unknown as Promise<IntlShape>;
}

export default getIntl;
