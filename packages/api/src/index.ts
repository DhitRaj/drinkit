import type { ApiResponse } from '@drinkit/types';

export interface DrinkitApiClientConfig {
  baseUrl: string;
  getAccessToken?: () => string | null | Promise<string | null>;
  onUnauthorized?: () => void;
}

/**
 * Thin typed HTTP client shell.
 * Endpoint methods are added in Sprint 6 against the API Specification.
 */
export class DrinkitApiClient {
  constructor(private readonly config: DrinkitApiClientConfig) {}

  async request<T>(
    path: string,
    init: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const token = this.config.getAccessToken
      ? await this.config.getAccessToken()
      : null;

    const headers = new Headers(init.headers);
    headers.set('Accept', 'application/json');
    if (!headers.has('Content-Type') && init.body) {
      headers.set('Content-Type', 'application/json');
    }
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${this.config.baseUrl}${path}`, {
      ...init,
      headers,
    });

    if (response.status === 401) {
      this.config.onUnauthorized?.();
    }

    return (await response.json()) as ApiResponse<T>;
  }
}

export function createApiClient(config: DrinkitApiClientConfig): DrinkitApiClient {
  return new DrinkitApiClient(config);
}
