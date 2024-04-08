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
}

export default CookieService;
