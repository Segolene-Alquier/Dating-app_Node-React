import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import _ from 'lodash';
import MediaCard from './components/media-card';

const ProfilesGrid = ({
  classes,
  profiles,
  currentUserProfile,
  handleLike,
  type,
}) => {
  console.log('currentUser', currentUserProfile);
  console.log('profiles', profiles);
  return (
    <div className={classes.wrapper}>
      <Container>
        <Grid container spacing={3}>
          {_.map(profiles, profile => (
            <Grid item xs={12} sm={6} md={3} lg={3} className={classes.center}>
              <MediaCard
                field={profile}
                profile={currentUserProfile}
                handleLike={handleLike}
                type={type}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ProfilesGrid;
