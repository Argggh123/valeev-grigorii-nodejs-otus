import React from 'react';

 const AuthContext = React.createContext({
  token: null,
  userId: null,
  login: (jwtToken: string, userId: string) => {},
  logout: () => {},
  isAuth: false,
});
export default AuthContext;
