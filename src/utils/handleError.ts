import type { TranslationKey } from '@/types/i18n';
import type { I18nError } from '@/types/common';

export function handleError(e: unknown): I18nError {
  const error = e as Error;

  return {
    ...error,
    message: error.message as TranslationKey,
  };
}
