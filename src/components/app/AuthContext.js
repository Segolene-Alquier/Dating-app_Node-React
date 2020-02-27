import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
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

  const socket = io(`${process.env.REACT_APP_PUBLIC_API_URL}`, {
    query: { token },
  });
  const socketContext = { socket };

  return (
    <AuthContext.Provider
      value={{
        authContext,
        socketContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.array.isRequired,
};
