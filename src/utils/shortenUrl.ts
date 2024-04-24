import { MAX_CONTENT_URL_LENGTH } from '@/consts/post';

function shortenUrl(string: string) {
  if (string.length <= MAX_CONTENT_URL_LENGTH) return string;

  const beginningLength = MAX_CONTENT_URL_LENGTH / 2 - 1;
  const endLength = MAX_CONTENT_URL_LENGTH / 2 - 2;

  const beginning = string.slice(0, beginningLength);
  const end = string.slice(string.length - endLength);

  return `${beginning}...${end}`;
}

export default shortenUrl;
