import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CityGuess from './location/cityGuess';

const UpperBoxProfile = ({classes, profile, getAge, handleChangeCity}) => {
  return (
    <Box className={classes.boxUpProfile}>
      <Grid container className={classes.containerUpProfile}>
        <Grid container bgcolor="secondary.main" xs={5} sm={3} justify="center">
          <img
            src={
              profile.profilePicture ||
              'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
            }
            alt="My profile"
            width="50%"
          />
        </Grid>
        <Grid container bgcolor="secondary.main" xs={7} sm={9}>
          <Grid
            container
            bgcolor="secondary.main"
            xs={6}
            sm={9}
            direction="column"
            justify="flex-end"
          >
            <div>{profile.firstname}</div>
            <div>
              <span>
                {profile.birthDate
                  ? getAge(
                      new Date(profile.birthDate).toISOString().split('T')[0],
                    )
                  : 'Age undefined '}
              </span>
              |{' '}
              <span>
                {profile.location ? (
                  <CityGuess
                    handleChangeCity={handleChangeCity}
                    lat={profile.location[0]}
                    lon={profile.location[1]}
                    profile={profile}
                  />
                ) : (
                  'unknown city'
                )}
              </span>
            </div>
          </Grid>
          <Grid
            container
            bgcolor="secondary.main"
            xs={6}
            sm={3}
            justify="center"
            alignItems="flex-end"
          >
            <Avatar className={classes.avatar}>78 %</Avatar>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpperBoxProfile;
