import type { IntlShape } from 'react-intl';

import type { TranslationKey } from '@/types/i18n';

export type TFunction = (key: TranslationKey) => string;
export const tFunction =
  (intl: IntlShape): TFunction =>
  (key) =>
    intl.formatMessage({ id: key });
