import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';
import VisitContainer from './visit-container';

const Visit = ({ computedMatch }) => {
  const visitedUsername = computedMatch.params.username;

  const { visitedProfile, loaded } = VisitContainer(visitedUsername);

  if (loaded === false) {
    return (
      // <div className={classes.progress}>
      <div>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <>
      {_.map(visitedProfile, temporaryField => (
        <ul>
          {_.map(temporaryField, field => (
            <li>{field}</li>
          ))}
        </ul>
      ))}
    </>
  );
};

export default Visit;
