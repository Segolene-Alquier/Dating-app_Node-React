import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import BlockIcon from '@material-ui/icons/Block';
import { getDistance } from 'geolib';
import CityGuess from './location/cityGuess';
import LoggedDot from '../../profileshow/components/loggedDot';

const useStyles = makeStyles(theme => ({
  fabUpBox: {
    margin: '0px 5px',
  },
  profileImg: {
    position: 'relative',
  },
  blockedIcon: {
    position: 'absolute',
  },
}));

const UpperBoxProfile = ({
  classes,
  profile,
  getAge,
  handleBlock,
  handleReport,
  handleChangeCity,
  handleLike,
  type,
}) => {
  const upBoxClasses = useStyles();
  const [blocked, setBlocked] = useState(profile.alreadyBlocked);
  const [reported, setReported] = useState(profile.alreadyReported);
  const [liked, setLiked] = useState(profile.visitorlikevisited);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const distance = () => {
    const { location: visitorLocation } = profile;
    let dist = getDistance(
      { latitude: profile.location[0], longitude: profile.location[1] },
      { latitude: visitorLocation[0], longitude: visitorLocation[1] },
    );
    dist = Math.round(dist / 1000);
    return ` | ${dist} km`;
  };

  const chatroomLink = `/chatroom/${profile.matchId}`;

  return (
    <Box
      className={
        profile.match === true
          ? classes.boxUpProfileMatch
          : classes.boxUpProfile
      }
    >
      <Grid container className={classes.containerUpProfile} direction="row">
        <Grid item xs={12} sm={6} className={classes.containerUpProfileLeft}>
          <Grid item xs={6} sm={5}>
            <img
              className={upBoxClasses.profileImg}
              src={
                profile.profilePicture ||
                'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
              }
              alt="My profile"
              width="90%"
            />
            {blocked ? (
              <BlockIcon
                className={upBoxClasses.blockedIcon}
                color="secondary"
                fontSize="large"
              />
            ) : null}
          </Grid>
          <Grid
            item
            xs={6}
            sm={7}
            className={classes.containerUpProfileLeftInfo}
          >
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
              <span>
                {profile.location ? (
                  type === 'public' ? (
                    distance()
                  ) : (
                    <CityGuess
                      handleChangeCity={handleChangeCity}
                      lat={profile.location[0]}
                      lon={profile.location[1]}
                      profile={profile}
                    />
                  )
                ) : null}
              </span>
              {type === 'public' ? (
                <LoggedDot
                  loggedState={profile.connected}
                  lastConnection={profile.lastConnection}
                  displayLast
                />
              ) : null}
            </div>
          </Grid>
        </Grid>
        <Grid item sm={6} xs={12} className={classes.containerUpProfileRight}>
          <Grid
            item
            bgcolor="secondary.main"
            xs={12}
            sm={4}
            className={classes.containerUpProfileRightFabs}
          >
            <Fab
              color="secondary"
              size="small"
              className={upBoxClasses.fabUpBox}
            >
              {profile.popularityRate}%
            </Fab>
          </Grid>
          {type === 'public' ? (
            <Grid
              item
              xs={12}
              sm={8}
              className={classes.containerUpProfileRightFabs}
            >
              {profile.match ? (
                <Fab
                  color="primary"
                  size="small"
                  className={upBoxClasses.fabUpBox}
                  href={chatroomLink}
                >
                  <MailOutlineIcon />
                </Fab>
              ) : null}
              {liked ? (
                <Fab
                  onClick={() => handleLike(profile.id, setLiked)}
                  color="primary"
                  size="small"
                  className={upBoxClasses.fabUpBox}
                >
                  <FavoriteIcon />
                </Fab>
              ) : (
                <Fab
                  onClick={() => handleLike(profile.id, setLiked)}
                  color="primary"
                  size="small"
                  className={upBoxClasses.fabUpBox}
                >
                  <FavoriteBorderIcon />
                </Fab>
              )}
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
                  <MenuItem
                    onClick={() => handleBlock(profile.id, blocked, setBlocked)}
                  >
                    {blocked ? 'Unblock' : 'Block'}
                  </MenuItem>
                  {reported ? (
                    <MenuItem disabled onClick={handleClose}>
                      You reported this user
                    </MenuItem>
                  ) : (
                    <MenuItem
                      onClick={() =>
                        handleReport(profile.id, reported, setReported)
                      }
                    >
                      Report
                    </MenuItem>
                  )}
                </Menu>
              </div>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpperBoxProfile;
