import React, { useContext } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import ProfileShowContainer from './profileshow-container';
import UpperBoxProfile from '../profile/components/upperBoxProfile';
import { AuthContext } from '../app/AuthContext';
import UseProfileForm from '../profile/profile-container';
import ChipsList from './components/chipsList';

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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    fontSize: '1em',
    padding: theme.spacing(1),
  },
  boxUpProfile: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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
  divider: {
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
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
}));

const ProfileShow = ({ computedMatch }) => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const visitedUsername = computedMatch.params.username;
  const {
    // profile,
    // loaded,
    handleChangeCity,
    // isChecked,
    getAge,
  } = UseProfileForm(authContext.userData, authContext.token);
  const { visitedProfile, loaded } = ProfileShowContainer(visitedUsername);

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
        handleChangeCity={handleChangeCity}
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
              {visitedProfile.images.map((image, index) => (
                <div className={classes.slide}>
                  <img
                    className={classes.imageSlider}
                    src={visitedProfile.images[index]}
                  />
                </div>
              ))}
            </SwipeableViews>
          </Grid>
        </Grid>
      </div>
      {/* {_.map(visitedProfile, temporaryField => (
        <p>{temporaryField}</p>
      ))} */}
    </>
  );
};

export default ProfileShow;
