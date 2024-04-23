import { ERROR_EMPTY_INPUT } from '@/consts/common';
import type { FormErrors } from '@/types/common';

const isFormElement = (element: Element | EventTarget): element is HTMLFormElement =>
  (element as Element).tagName === 'FORM';

const isInputElement = (element: Element): element is HTMLInputElement =>
  ['INPUT', 'TEXTAREA'].includes(element.tagName);

const getFormData = <T>(form: EventTarget): { data: T; errors: FormErrors<T> | undefined } | undefined => {
  if (!isFormElement(form)) return;

  const data: Record<string, string> = {};
  let errors: FormErrors<T> | undefined = undefined;

  for (const element of Array.from(form.elements)) {
    if (!isInputElement(element)) continue;

    const name = element.name as keyof T;

    data[element.name] = element.value;

    if (element.required && !element.value) {
      if (!errors) errors = {} as FormErrors<T>;
      errors[name] = ERROR_EMPTY_INPUT;
    }
  }

  return { data: data as T, errors };
};

export default getFormData;
