import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Toaster from '../toaster/index';

const Home = ({ location }) => {
  const getParams = queryString.parse(location.search);
  console.log(getParams);
  return (
    <>
      <h1>Home Page</h1>
      <Toaster getParams={getParams} />
    </>
  );
};
Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
};
export default Home;
