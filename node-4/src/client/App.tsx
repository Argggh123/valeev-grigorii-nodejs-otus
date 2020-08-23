import React from 'react';

import Layout from './hoc/Layout';
import { useRoutes } from './hooks/useRoutes';
import { useAuth } from './hooks/useAuth';
import AuthContext from './context/Auth.Context';

export default function App(): React.ReactElement {
  const [login, logout, token, userId, isReady] = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  if (!isReady) {
    return <h1>Loading</h1>;
  }

  return (
    <AuthContext.Provider value={{
      isAuth,
      token,
      userId,
      login,
      logout,
    }}>
      <Layout>
      {routes}
    </Layout>
    </AuthContext.Provider>

  );
}
