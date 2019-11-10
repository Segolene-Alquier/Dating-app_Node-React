import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Redirect, Route } from 'react-router-dom';

export default ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  let defaultValue = authContext.token !== null;
  const [secureAuth, setSecureAuth] = useState(defaultValue);
  if (secureAuth === true) {
    authContext.userData.then(data => setSecureAuth(data.success));
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (secureAuth) {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  toasterType: 'warning',
                  toasterMessage: 'You are already logged in!',
                },
              }}
            />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};
