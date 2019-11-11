import React from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Home = ({ location }) => {
  const { toasterMessage, toasterType } = location.state || {};
  if (!_.isUndefined(toasterType) && !_.isUndefined(toasterMessage)) {
    toast(toasterMessage, {
      type: toasterType,
    });
  }

  return <h1>Home Page</h1>;
};
Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
};
export default Home;
