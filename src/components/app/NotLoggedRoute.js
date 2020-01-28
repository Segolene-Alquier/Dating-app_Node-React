/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext';
import { isTokenExpired } from '../auth/AuthContainer';

const NotLoggedRoute = ({ component: Component, ...rest }) => {
  const { authContext } = useContext(AuthContext);
  const defaultValue =
    authContext.token !== null && !isTokenExpired(authContext.token);
  const [secureAuth, setSecureAuth] = useState(defaultValue);
  if (secureAuth === true) {
    authContext.userData.then(data => setSecureAuth(data.success));
    window.location = '/?message=already_loggedin';
  }
  return <Component {...rest} />;
};

NotLoggedRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default NotLoggedRoute;
