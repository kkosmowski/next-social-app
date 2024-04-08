import { ERROR_EMPTY_INPUT } from '@/consts/common';
import type { TranslationKey } from '@/types/i18n';

const isFormElement = (element: Element | EventTarget): element is HTMLFormElement =>
  (element as Element).tagName === 'FORM';

const isInputElement = (element: Element): element is HTMLInputElement => element.tagName === 'INPUT';

const getFormData = <T>(form: EventTarget): { data: T; errors: Record<string, TranslationKey> | null } | null => {
  if (!isFormElement(form)) return null;

  const data: Record<string, string> = {};
  let errors: Record<string, TranslationKey> | null = null;

  for (const element of Array.from(form.elements)) {
    if (!isInputElement(element)) continue;

    data[element.name] = element.value;

    if (!element.value) {
      if (!errors) errors = {};
      errors[element.name] = ERROR_EMPTY_INPUT;
    }
  }

  return { data: data as T, errors };
};

export default getFormData;
