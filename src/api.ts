import { API_URL } from '@/env';
import stringifyParams from '@/utils/stringifyParams';
import type { Endpoint } from '@/consts/endpoints';
import type { DynamicEndpoint } from '@/app/utils/dynamicEndpoint';

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

  async get<R>(endpoint: Endpoint | DynamicEndpoint, options?: FetchOptions): Promise<R> {
    const res = await this.fetch(endpoint, options);

    if (res.ok) {
      if (res.status !== 204) {
        return res.json();
      }
      return Promise.resolve() as Promise<R>;
    }
    throw new Error((await res.json()).error);
  }

  async post<T, R>(endpoint: Endpoint | DynamicEndpoint, body?: T, options?: FetchOptions): Promise<R> {
    const res = await this.fetch(endpoint, {
      ...options,
      init: {
        ...options?.init,
        method: 'POST',
        body: JSON.stringify(body),
      },
    });

    if (res.ok) {
      if (res.status !== 204) {
        return res.json();
      }
      return Promise.resolve() as Promise<R>;
    }
    throw new Error((await res.json()).error);
  }

  async patch<T, R>(endpoint: Endpoint | DynamicEndpoint, body?: T, options?: FetchOptions): Promise<R> {
    const res = await this.fetch(endpoint, {
      ...options,
      init: {
        ...options?.init,
        method: 'PATCH',
        body: JSON.stringify(body),
      },
    });

    if (res.ok) {
      if (res.status !== 204) {
        return res.json();
      }
      return Promise.resolve() as Promise<R>;
    }
    throw new Error((await res.json()).error);
  }

  async delete<T, R>(endpoint: Endpoint | DynamicEndpoint, body?: T, options?: FetchOptions): Promise<R> {
    const res = await this.fetch(endpoint, {
      ...options,
      init: {
        ...options?.init,
        method: 'DELETE',
        body: JSON.stringify(body),
      },
    });

    if (res.ok) {
      if (res.status !== 204) {
        return res.json();
      }
      return Promise.resolve() as Promise<R>;
    }
    throw new Error((await res.json()).error);
  }
}

const api = new ApiClient(API_URL);
export default api;
