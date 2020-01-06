import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';
import ProfileShowContainer from './profileshow-container';

const ProfileShow = ({ computedMatch }) => {
  const visitedUsername = computedMatch.params.username;

  const { visitedProfile, loaded } = ProfileShowContainer(visitedUsername);

  if (loaded === false) {
    return (
      // <div className={classes.progress}>
      <div>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return <>{_.map(visitedProfile, temporaryField => <p>{temporaryField}</p>)}</>;
};

export default ProfileShow;
