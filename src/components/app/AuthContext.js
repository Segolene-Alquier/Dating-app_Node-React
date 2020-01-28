import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getToken, getUserData } from '../auth/AuthContainer';
import io from 'socket.io-client';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const currentToken = getToken();
  const [token] = useState(currentToken);
  const [userData] = useState(getUserData(currentToken));

  const authContext = {
    token,
    userData,
  };
  const socket = io(`http://localhost:3001`);
  const socketContext = {socket}

  return (
    <AuthContext.Provider value={{authContext, socketContext}}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.array.isRequired,
};
