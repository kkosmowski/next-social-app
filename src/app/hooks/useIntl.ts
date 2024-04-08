import { useCallback } from 'react';

import { useIntl as useOriginalIntl } from 'react-intl';

import { tFunction } from '@/app/utils/tFunction';
import type { Locale } from '@/types/i18n';
import { localeToCode } from '@/i18n/consts';

function useIntl() {
  const intl = useOriginalIntl();

  const t = useCallback(tFunction(intl), [intl]);
  const locale = intl.locale as Locale;
  const localeCode = localeToCode[locale];

  return { t, locale, localeCode };
}

export default useIntl;
