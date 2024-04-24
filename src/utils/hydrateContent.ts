import shortenUrl from './shortenUrl';

function hydrateContent(content: string): string {
  const regex = /http(s)?:\/\/(\S)+/gi;

  return content.replaceAll(
    regex,
    (substring) => `<a href="${substring}" target="_blank">${shortenUrl(substring)}</a>`,
  );
}

export default hydrateContent;
