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
    padding: theme.spacing(1),
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
    width: '50%',
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },
}));

const ProfileShow = ({ computedMatch }) => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const visitedUsername = computedMatch.params.username;
  // const Slide = require('./Slide').default;
  const { red, blue, green } = require('@material-ui/core/colors');
  const {
    // profile,
    // loaded,
    handleChangeCity,
    // isChecked,
    getAge,
    // fetchInterests,
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
      <Grid container>
        <Grid
          container
          sm={6}
          direction="column"
          className={classes.columnPublicProfile}
        >
          <Typography variant="subtitle1">
            <Box fontWeight="fontWeightBold">
              {visitedProfile.firstname} identifies as
            </Box>
          </Typography>
          {_.isEmpty(visitedProfile.gender) ? (
            <p>No gender defined so far</p>
          ) : (
            <ChipsList classes={classes} list={visitedProfile.gender} type='gender'/>
          )}
          <Typography variant="subtitle1">
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
              type='preference'
            />
          )}
          <Typography variant="subtitle1">
            <Box fontWeight="fontWeightBold">
              {visitedProfile.firstname} in a few words
            </Box>
          </Typography>
          <Paper elevation={3} className={classes.summary}>
            <p>{visitedProfile.description}</p>
          </Paper>
        </Grid>
        <Grid
          container
          sm={6}
          direction="column"
          className={classes.columnPublicProfile}
        >
          <Typography variant="subtitle1">
            <Box fontWeight="fontWeightBold">
              {visitedProfile.firstname}'s interests
            </Box>
          </Typography>
          {_.isEmpty(visitedProfile.interests) ? (
            <p>No interests defined so far</p>
          ) : (
            <ChipsList classes={classes} list={visitedProfile.interests} type='interests' />
          )}
          <Typography variant="subtitle1">
            <Box fontWeight="fontWeightBold">
              {visitedProfile.firstname}'s pictures
            </Box>
          </Typography>
          <SwipeableViews className={classes.carousel}>
            <div className={(classes.slide, classes.slide1)}>slide n°1</div>
            <div className={(classes.slide, classes.slide2)}>slide n°2</div>
            <div className={(classes.slide, classes.slide3)}>slide n°3</div>
          </SwipeableViews>
          {/* <div style={{ position: 'relative', width: '100%', height: 500 }}>
            <AutoRotatingCarousel
              label="Get started"
              // open={state.open}
              // onClose={() => setState({ open: false })}
              // onStart={() => setState({ open: false })}
              style={{ position: 'absolute' }}
            >
              <Slide
                media={
                  <img src="http://www.icons101.com/icon_png/size_256/id_79394/youtube.png" />
                }
                mediaBackgroundStyle={{ backgroundColor: red[400] }}
                style={{ backgroundColor: red[600] }}
                title="This is a very cool feature"
                subtitle="Just using this will blow your mind."
              />
              <Slide
                media={
                  <img src="http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png" />
                }
                mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                style={{ backgroundColor: blue[600] }}
                title="Ever wanted to be popular?"
                subtitle="Well just mix two colors and your are good to go!"
              />
              <Slide
                media={
                  <img src="http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png" />
                }
                mediaBackgroundStyle={{ backgroundColor: green[400] }}
                style={{ backgroundColor: green[600] }}
                title="May the force be with you"
                subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
              />
            </AutoRotatingCarousel> */}
          {/* </div> */}
        </Grid>
      </Grid>
      {_.map(visitedProfile, temporaryField => (
        <p>{temporaryField}</p>
      ))}
    </>
  );
};

export default ProfileShow;
