import React from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash'

const Home = (props) => {
  let { toasterMessage, toasterType } = props.location.state || {};
  if (!_.isUndefined(toasterType) && !_.isUndefined(toasterMessage)) {
    toast(toasterMessage, {
      type: toasterType,
    });
  }

  return <h1>Home Page</h1>;
};

export default Home
