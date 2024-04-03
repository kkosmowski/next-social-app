import { useCallback } from 'react';

import { useIntl as useOriginalIntl } from 'react-intl';

import { tFunction } from '@/app/utils/tFunction';

function useIntl() {
  const intl = useOriginalIntl();

  const t = useCallback(tFunction(intl), [intl]);

  return { t, locale: intl.locale };
}

export default useIntl;
