import React from 'react';

export type UseFetchOptionsType = {
  method?: 'GET' | 'POST';
}

export function useHttp(
  url: string,
  options: UseFetchOptionsType = { method: 'GET'},
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
        method: options.method,
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
