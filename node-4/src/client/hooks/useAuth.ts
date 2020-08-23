import React from 'react';
import { useLazyHttp } from './useHttp';
import Cookies from 'js-cookie';

export function useAuth(): [
  (token: string, id: string) => void,
  () => void,
  string,
  string,
  boolean,
] {
  const [token, setToken] = React.useState<string | null>(null);
  const [userId, setUserId] = React.useState<string | null>(null);
  const [isReady, setIsReady] = React.useState<boolean>(false);
  const [fetchData, loading, error] = useLazyHttp();

  const login = React.useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);
    Cookies.set('OAUTH_TOKEN', jwtToken, { expires: 3600 });
  }, []);

  const logout = React.useCallback(() => {
    setToken(null);
    setUserId(null);
    Cookies.remove('OAUTH_TOKEN');
  }, []);

  const authorize = React.useCallback(async () => {
    try {
      const result = await fetchData(
        '/api/auth/authorize',
        {
          method: 'POST',
        },
      );
      if (result) {
        setToken(result.token);
      }
      setIsReady(true);
    } catch (e) {
      console.log(e);
    }

  }, []);

  React.useEffect(() => {
    authorize();
  }, []);

  return [
    login,
    logout,
    token,
    userId,
    isReady,
  ];
}
