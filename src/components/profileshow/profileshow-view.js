import React, { useContext } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import ProfileShowContainer from './profileshow-container';
import UpperBoxProfile from '../profile/components/upperBoxProfile';
import { AuthContext } from '../app/AuthContext';
import UseProfileForm from '../profile/profile-container';
import ChipsList from './components/chipsList';
// import Background from '../../assets/images/heart-confetti-background-1.png';
// import Background from 'https://media.giphy.com/media/ugEWbEMH0gm2c/giphy.gif';
//
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  progress: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperProfile: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1500px',
  },
  // paper: {
  //   marginTop: theme.spacing(8),
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  // },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    fontSize: '1em',
    padding: theme.spacing(1),
  },
  boxUpProfile: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  boxUpProfileMatch: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundImage: `url(${Background})`,
    // backgroundImage: `url("https://media.giphy.com/media/ugEWbEMH0gm2c/giphy.gif")`,
    // backgroundImage: `url("https://media.giphy.com/media/xTcnT2ZYSaCTdkTSmI/giphy.gif")`,
    backgroundImage: `url("https://media.giphy.com/media/26ufcYAkp8e66vanu/giphy.gif")`,
    // backgroundSize: 'cover',
  },
  containerUpProfile: {
    maxWidth: '1500px',
  },
  columnPublicProfile: {
    padding: theme.spacing(0, 2),
  },
  pictureContainer: {
    padding: theme.spacing(1),
    position: 'relative',
    width: '100%',
    height: 'fit-content',
  },
  picture: {
    objectFit: 'cover',
  },
  tabs: {
    margin: theme.spacing(1),
  },
  item: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
  },
  summary: {
    padding: theme.spacing(3),
    // width: '90%',
  },
  genderChips: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  carousel: {
    width: '100%',
    maxWidth: '450px',
  },
  slide: {
    width: '100%',
    maxWidth: '450px',
    objectFit: 'contain',
  },
  imageSlider: {
    width: '100%',
  },
  loggedDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#64dd17',
  },
  notLoggedDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#b0bec5',
  },
}));

const ProfileShow = ({ computedMatch }) => {
  const classes = useStyles();
  const { authContext } = useContext(AuthContext);
  const visitedUsername = computedMatch.params.username;
  const { handleChangeCity, getAge } = UseProfileForm(
    authContext.userData,
    authContext.token,
  );
  const {
    visitedProfile,
    loaded,
    handleBlock,
    handleReport,
    handleLike,
  } = ProfileShowContainer(visitedUsername);

  if (loaded === false) {
    return (
      <div className={classes.progress}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <>
      <UpperBoxProfile
        classes={classes}
        profile={visitedProfile}
        getAge={getAge}
        handleBlock={handleBlock}
        handleReport={handleReport}
        handleChangeCity={handleChangeCity}
        handleLike={handleLike}
        type="public"
      />
      <Divider className={classes.divider} />
      <div className={classes.wrapperProfile}>
        <Grid container>
          <Grid
            container
            sm={6}
            direction="column"
            className={classes.columnPublicProfile}
          >
            <Typography variant="subtitle1" className={classes.item}>
              <Box fontWeight="fontWeightBold">
                {visitedProfile.firstname} identifies as
              </Box>
            </Typography>
            {_.isEmpty(visitedProfile.gender) ? (
              <p>No gender defined so far</p>
            ) : (
              <ChipsList
                classes={classes}
                list={visitedProfile.gender}
                type="gender"
              />
            )}
            <Typography variant="subtitle1" className={classes.item}>
              <Box fontWeight="fontWeightBold">
                {visitedProfile.firstname} is looking for
              </Box>
            </Typography>
            {_.isEmpty(visitedProfile.sexualOrientation) ? (
              <p>No preference defined so far</p>
            ) : (
              <ChipsList
                classes={classes}
                list={visitedProfile.sexualOrientation}
                type="preference"
              />
            )}
            <Typography variant="subtitle1" className={classes.item}>
              <Box fontWeight="fontWeightBold">
                {visitedProfile.firstname} in a few words
              </Box>
            </Typography>
            <Paper elevation={3} className={classes.summary}>
              {_.isEmpty(visitedProfile.description) ? (
                <p>No description defined so far</p>
              ) : (
                <p>{visitedProfile.description}</p>
              )}
            </Paper>
          </Grid>
          <Grid
            container
            sm={6}
            direction="column"
            className={classes.columnPublicProfile}
          >
            <Typography variant="subtitle1" className={classes.item}>
              <Box fontWeight="fontWeightBold">
                {visitedProfile.firstname}'s interests
              </Box>
            </Typography>
            {_.isEmpty(visitedProfile.interests) ? (
              <p>No interests defined so far</p>
            ) : (
              <ChipsList
                classes={classes}
                list={visitedProfile.interests}
                type="interests"
              />
            )}
            <Typography variant="subtitle1" className={classes.item}>
              <Box fontWeight="fontWeightBold">
                {visitedProfile.firstname}'s pictures
              </Box>
            </Typography>
            <SwipeableViews className={classes.carousel} enableMouseEvents>
              {_.isEmpty(visitedProfile.images) ? (
                <p>No pictures uploaded so far</p>
              ) : (
                visitedProfile.images.map((image, index) => (
                  <div className={classes.slide}>
                    <img
                      className={classes.imageSlider}
                      src={visitedProfile.images[index]}
                      alt="profile"
                    />
                  </div>
                ))
              )}
            </SwipeableViews>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ProfileShow;
