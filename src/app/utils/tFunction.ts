import type { IntlShape } from 'react-intl';

export type TFunction = (key: string) => string;
export const tFunction = (intl: IntlShape) => (key: string) => intl.formatMessage({ id: key });
