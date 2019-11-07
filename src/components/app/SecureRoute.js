import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';

export default ({ component: Component, ...rest }) => {
  const [secureAuth, setSecureAuth] = useState(true);
  const authContext = useContext(AuthContext);

  const checkAuthentification = async data => {
    const isAuthenticaded = await axios.get('http://localhost:3001/auth/checkToken', {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-access-token': data.token,
      },
    });
    setSecureAuth(isAuthenticaded.data.success);
  };
  checkAuthentification(authContext);

  return (
    <Route
      {...rest}
      render={props => {
        if (secureAuth) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/Login" />;
        }
      }}
    />
  );
};
