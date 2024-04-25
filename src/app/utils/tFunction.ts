import type { ReactNode } from 'react';

import type { IntlShape } from 'react-intl';
import type { PrimitiveType, FormatXMLElementFn } from 'intl-messageformat/src/formatters';

import type { TranslationKey } from '@/types/i18n';

export type TFunction = (
  key: TranslationKey,
  values?: Record<string, PrimitiveType | FormatXMLElementFn<string, ReactNode>>,
) => string;

export const tFunction =
  (intl: IntlShape): TFunction =>
  (key, values) =>
    // eslint-disable-next-line
    // @ts-ignore
    intl.formatMessage({ id: key }, values);
