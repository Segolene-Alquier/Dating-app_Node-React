import React, { createContext, useState } from 'react';
import { getToken } from '../auth/AuthContainer';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const currentToken = getToken();
  const [token] = useState(currentToken);

  const authContext = {
    token,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};
