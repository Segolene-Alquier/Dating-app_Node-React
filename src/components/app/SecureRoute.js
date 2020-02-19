/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext';

const SecureRoute = ({ component: Component, ...rest }) => {
  const { authContext } = useContext(AuthContext);
  const defaultValue = authContext.token !== null;
  const [secureAuth, setSecureAuth] = useState(defaultValue);
  if (secureAuth === true) {
    authContext.userData.then(data => {
      if (data === null) {
        window.location = '/login';
      }
      setSecureAuth(data.success);
    });
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (secureAuth) {
          return <Component {...props} {...rest} />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
};

SecureRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
export default SecureRoute;
