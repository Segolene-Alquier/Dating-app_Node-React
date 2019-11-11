/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext';

const NotLoggedRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const defaultValue = authContext.token !== null;
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
        }
        return <Component {...props} />;
      }}
    />
  );
};

NotLoggedRoute.propTypes = {
  component: PropTypes.element.isRequired,
};

export default NotLoggedRoute;
