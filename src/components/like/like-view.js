import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import LikeContainer from './like-container';
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

const Like = ({ computedMatch }) => {
  const likedUsername = computedMatch.params.username;

  const { likedProfile, likerProfile, loaded, handleLike } = LikeContainer(
    likedUsername,
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
      <Title textTitle="History of likes" />
      <ProfilesGrid
        classes={classes}
        profiles={likedProfile}
        currentUserProfile={likerProfile}
        handleLike={handleLike}
      />
    </>
  );
};

export default Like;
