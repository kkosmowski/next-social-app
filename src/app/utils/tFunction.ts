import type { IntlShape } from 'react-intl';

import type { TranslationKey } from '@/types/i18n';

export type TFunction = (key: string) => string;
export const tFunction = (intl: IntlShape) => (key: TranslationKey) => intl.formatMessage({ id: key });
