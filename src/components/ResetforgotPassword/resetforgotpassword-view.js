import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ResetForgotPassword = ({ computedMatch }) => {
  const { token } = computedMatch.params;
  const { validToken, setValidToken } = useState(false);
  axios
    .get(`http://localhost:3001/validation/forgotpassword/${token}`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(data => {
      console.log(data.data.success);
      if (data.data.success) {
        setValidToken(true);
      } else {
        window.location = '/?message=user_not_validated';
      }
    });
  if (validToken) {
    return <h1>Formulaire mot de passe</h1>;
  }
  return <h1>Chargement en cours</h1>;
};

ResetForgotPassword.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  computedMatch: PropTypes.object.isRequired,
};

export default ResetForgotPassword;
