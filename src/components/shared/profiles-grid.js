import React from 'react';
import Grid from '@material-ui/core/Grid';
import MediaCard from './components/media-card';
import Container from '@material-ui/core/Container';
import _ from 'lodash';

const ProfilesGrid = ({
  classes,
  profiles,
  currentUserProfile,
  handleLike,
}) => {
  console.log('currentUser', currentUserProfile);
  console.log("profiles", profiles)
  return (
    <div className={classes.wrapper}>
      <Container>
        <Grid container spacing={3}>
          {_.map(profiles, profile => (
            <Grid item xs={12} sm={4} md={3} lg={2} className={classes.center}>
              <MediaCard
                field={profile}
                profile={currentUserProfile}
                handleLike={handleLike}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ProfilesGrid;
