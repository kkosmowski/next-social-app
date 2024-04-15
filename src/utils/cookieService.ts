class CookieService {
  static get(key: string): string | null {
    const cookie = decodeURIComponent(document.cookie);

    const cookieArray = cookie.split('; ');

    for (const pair of cookieArray) {
      const [cookieKey, cookieValue] = pair.split('=');

      if (cookieKey === key) {
        return cookieValue;
      }
    }

    return null;
  }
  static clear(key: string) {
    if (!document) {
      console.warn('Attempted to use document.cookie on server side.');
      return;
    }

    const cookie = decodeURIComponent(document.cookie);

    const cookieArray = cookie.split('; ').filter((pair) => !pair.includes(key));
    document.cookie = cookieArray.join('; ');
  }
}

export default CookieService;
