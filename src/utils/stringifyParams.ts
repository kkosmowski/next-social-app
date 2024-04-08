function stringifyParams(params?: Record<string, string | number>): string {
  if (!params) return '';

  const entries = Object.entries(params);

  if (!entries.length) return '';

  const joined = entries.reduce((string, [key, value]) => string + `&${key}=${value}`, '');
  return joined.replace('&', '?');
}

export default stringifyParams;
