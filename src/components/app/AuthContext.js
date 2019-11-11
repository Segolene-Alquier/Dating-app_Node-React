import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getToken, getUserData } from '../auth/AuthContainer';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const currentToken = getToken();
  const [token] = useState(currentToken);
  const [userData] = useState(getUserData(currentToken));

  const authContext = {
    token,
    userData,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
