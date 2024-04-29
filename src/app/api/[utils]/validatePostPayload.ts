import type { AddPostPayload } from '@/types/post';

function validatePostPayload<P extends AddPostPayload>(payload: P): [true, undefined] | [false, (keyof P)[]] {
  let isValid = true;
  const invalidFields: (keyof P)[] = [];

  if (!payload.title) {
    isValid = false;
    invalidFields.push('title');
  }

  if (!payload.content) {
    isValid = false;
    invalidFields.push('content');
  }

  if (isValid) {
    return [isValid, undefined];
  }
  return [isValid, invalidFields];
}

export default validatePostPayload;
