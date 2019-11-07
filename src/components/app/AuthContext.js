import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../auth/AuthContainer';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const currentToken = getToken();
  const [token, setToken] = useState(currentToken);

  const authContext = {
    token,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};
