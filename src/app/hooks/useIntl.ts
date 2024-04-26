import { useCallback } from 'react';

import { useIntl as useOriginalIntl } from 'react-intl';

import { tFunction } from '@/app/utils/tFunction';
import type { Locale } from '@/types/i18n';

function useIntl() {
  const intl = useOriginalIntl();

  const t = useCallback(tFunction(intl), [intl]);
  const locale = intl.locale as Locale;

  return { t, locale };
}

export default useIntl;
