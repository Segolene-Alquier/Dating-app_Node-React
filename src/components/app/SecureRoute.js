import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { checkAuthentification } from '../auth/AuthContainer';
import { Redirect, Route } from 'react-router-dom';

export default ({ component: Component, ...rest }) => {
  const [secureAuth, setSecureAuth] = useState(true);
  const authContext = useContext(AuthContext);

  checkAuthentification(authContext, setSecureAuth);

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
