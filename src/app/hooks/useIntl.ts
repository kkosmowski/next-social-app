import { useCallback } from 'react';

import { useIntl as useOriginalIntl } from 'react-intl';

import { tFunction } from '@/app/utils/tFunction';
import type { Locale } from '@/types/i18n';

function useIntl() {
  const intl = useOriginalIntl();

  const t = useCallback(tFunction(intl), [intl]);

  return { t, locale: intl.locale as Locale };
}

export default useIntl;
