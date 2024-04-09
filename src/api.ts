import { API_URL } from '@/env';
import stringifyParams from '@/utils/stringifyParams';
import type { Endpoint } from '@/consts/endpoints';

type FetchOptions = {
  init?: RequestInit;
  params?: Record<string, string | number>;
};

class ApiClient {
  private readonly apiUrl: string;
  private readonly fetch = (endpoint: Endpoint, options?: FetchOptions) =>
    fetch(`${this.apiUrl}${endpoint}${stringifyParams(options?.params)}`, options?.init);

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async get<R>(endpoint: Endpoint, options?: FetchOptions): Promise<R> {
    const res = await this.fetch(endpoint, options);

    if (res.ok) return res.json();
    throw new Error((await res.json()).error);
  }

  async post<T, R>(endpoint: Endpoint, body?: T, options?: FetchOptions): Promise<R> {
    const res = await this.fetch(endpoint, {
      ...options,
      init: {
        ...options?.init,
        method: 'POST',
        body: JSON.stringify(body),
      },
    });

    if (res.ok) return res.json();
    throw new Error((await res.json()).error);
  }
}

const api = new ApiClient(API_URL);
export default api;
