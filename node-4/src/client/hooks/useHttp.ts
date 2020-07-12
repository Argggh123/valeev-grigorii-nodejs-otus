import Cookies from 'js-cookie';
import React from 'react';

export type UseFetchOptionsType = RequestInit & {
  method?: 'GET' | 'POST';
}

function setHeaders() {
  return {
    authorization: `Bearer ${Cookies.get('OAUTH_TOKEN')}`,
    'Content-Type': 'application/json; charset=utf-8',
  };
}

export function useHttp(
  url: string,
  options: UseFetchOptionsType = { method: 'GET' },
) {
  const [data, setData] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);
  const fetchData = React.useCallback(async (
    apiUrl: string,
    options: UseFetchOptionsType,
  ) => {
    try {
      const response = await fetch(apiUrl, {
        ...options,
        headers: setHeaders(),
      });
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData(url, options);
  }, []);

  return [data, loading, error];
}

export function useLazyHttp(): [
  (
    url: string,
    options: UseFetchOptionsType,
  ) => Promise<any>, boolean, Error, () => void
] {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchData = React.useCallback(
    async (
      url: string,
      options: UseFetchOptionsType = { method: 'GET' },
    ) => {
      try {
        setLoading(true);
        const headers = setHeaders();

        console.log(options);
        const response = await fetch(url, {
          ...options,
          headers,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'что то пошло не так');
        }
        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
      }

    },
    [],
  );

  const clearError = React.useCallback(() => setError(null), []);

  return [fetchData, loading, error, clearError];
}
