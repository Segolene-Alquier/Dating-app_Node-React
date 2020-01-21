import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CityGuess from './location/cityGuess';
import LoggedDot from '../../profileshow/components/loggedDot';

const UpperBoxProfile = ({
  classes,
  profile,
  getAge,
  handleChangeCity,
  type,
}) => {
  return (
    <Box className={classes.boxUpProfile}>
      <Grid
        container
        className={classes.containerUpProfile}
        xs={12}
        sm={12}
        direction="row"
      >
        <Grid container xs={12} sm={6} direction="row" justify="flex-start">
          <Grid container xs={6} sm={5}>
            <img
              src={
                profile.profilePicture ||
                'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
              }
              alt="My profile"
              width="90%"
            />
          </Grid>
          <Grid container xs={6} sm={7} direction="column" justify="flex-end">
            <div>
              <span>{profile.firstname}</span>
            </div>
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
              {type === 'public' ? <LoggedDot loggedState={true} /> : null}
            </div>
          </Grid>
        </Grid>
        <Grid container sm={6} xs={12} direction="row" justify="flex-end">
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
          <Grid container xs={6} sm={3} justify="center" alignItems="flex-end">
            <MailOutlineIcon fontSize="80px" />
            <FavoriteBorderIcon />
            <FavoriteIcon />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpperBoxProfile;
