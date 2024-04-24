import type { AddPostPayload } from '@/types/post';

function validatePostPayload(payload: AddPostPayload): [true, undefined] | [false, string] {
  let isValid = true;
  const invalid = [];

  if (!payload.title) {
    isValid = false;
    invalid.push('title');
  }

  if (!payload.content) {
    isValid = false;
    invalid.push('content');
  }

  if (isValid) {
    return [isValid, undefined];
  }
  return [isValid, `These fields are not valid: ${invalid.join(', ')}.`];
}

export default validatePostPayload;
