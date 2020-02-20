import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import VisitContainer from './visit-container';
import Title from '../shared/title';
import ProfilesGrid from '../shared/profiles-grid';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1500px',
    marginTop: '10px',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Visit = ({ computedMatch }) => {
  const visitedUsername = computedMatch.params.username;

  const { visitedProfile, visitorProfile, loaded, handleLike } = VisitContainer(
    visitedUsername,
  );
  const classes = useStyles();

  if (loaded === false) {
    return (
      <div className={classes.progress}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <>
      <Title textTitle="History of visits" />
      <ProfilesGrid
        classes={classes}
        profiles={visitedProfile}
        currentUserProfile={visitorProfile}
        handleLike={handleLike}
      />
    </>
  );
};

export default Visit;
