import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

const UserValidation = ({ computedMatch }) => {
  const { token } = computedMatch.params;
  axios
    .get(
      `http://${process.env.REACT_APP_PUBLIC_API_URL}/validation/newaccount/${token}`,
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
    .then(data => {
      if (data.data.success) {
        window.location = '/?message=user_validated';
      } else {
        window.location = '/?message=user_not_validated';
      }
    });
  return <h1>Chargement en cours</h1>;
};

UserValidation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  computedMatch: PropTypes.object.isRequired,
};

export default UserValidation;
