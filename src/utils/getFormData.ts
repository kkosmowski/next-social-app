import { ERROR_EMPTY_INPUT } from '@/consts/common';
import type { TranslationKey } from '@/types/i18n';
import type { FormErrors } from '@/types/common';

const isFormElement = (element: Element | EventTarget): element is HTMLFormElement =>
  (element as Element).tagName === 'FORM';

const isInputElement = (element: Element): element is HTMLInputElement =>
  ['INPUT', 'TEXTAREA'].includes(element.tagName);

const getFormData = <T>(form: EventTarget): { data: T; errors: FormErrors<T> } => {
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
