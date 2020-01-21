import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import CityGuess from './location/cityGuess';
import LoggedDot from '../../profileshow/components/loggedDot';

const useStyles = makeStyles(theme => ({
  fabUpBox: {
    margin: '0px 5px',
  },
}));

const UpperBoxProfile = ({
  classes,
  profile,
  getAge,
  handleChangeCity,
  type,
}) => {
  const upBoxClasses = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
            xs={12}
            sm={4}
            justify="flex-end"
            alignItems="flex-end"
          >
            <Avatar className={classes.avatar}>78 %</Avatar>
          </Grid>
          {type === 'public' ?
          (<Grid
            container
            xs={12}
            sm={8}
            justify="flex-end"
            alignItems="flex-end"
          >
            <Fab color="primary" size="small" className={upBoxClasses.fabUpBox}>
              <MailOutlineIcon />
            </Fab>
            <Fab color="primary" size="small" className={upBoxClasses.fabUpBox}>
              <FavoriteBorderIcon />
            </Fab>
            <Fab color="primary" size="small" className={upBoxClasses.fabUpBox}>
              <FavoriteIcon />
            </Fab>
            <div>
              <Fab
                onClick={handleClick}
                color="secondary"
                size="small"
                className={upBoxClasses.fabUpBox}
              >
                <ReportProblemIcon />
              </Fab>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Bloquer</MenuItem>
                <MenuItem onClick={handleClose}>Signaler</MenuItem>
              </Menu>
            </div>
          </Grid>) : null}

        </Grid>
      </Grid>
    </Box>
  );
};

export default UpperBoxProfile;
