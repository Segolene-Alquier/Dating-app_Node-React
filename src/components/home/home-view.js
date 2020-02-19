import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Typography,
  Fab,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import Toaster from '../toaster/index';
import Background from '../../assets/images/home-bg-1.jpg';
import { AuthContext } from '../app/AuthContext';

const useStyles = makeStyles(theme => ({
  homeWrapper: {
    height: 'calc(100vh - 64px)',
    width: '100vw',
    padding: theme.spacing(6),
  },
  bgImage: {
    height: '100%',
    width: '100%',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeTextDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255, 0.9)',
    padding: theme.spacing(3),
    borderRadius: '5px',
  },
  CTA: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  signIn: {
    backgroundColor: 'rgb(255, 255, 255)',
    border: '3px solid',
    borderColor: theme.palette.secondary.main,
  },
  CTAWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashboard: {
    height: 'calc(100vh - 64px)',
  },
  upDivWrapper: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(3),
  },
  gridWrapper: {
    height: '100%',
  },
  columnCTAS: {
    backgroundColor: '#f4f4f4',
    height: '100%',
    padding: theme.spacing(3),
  },
  paperCTA: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  findMatchTitle: {
    marginBottom: theme.spacing(6),
  },
}));

const Home = ({ location }) => {
  const classes = useStyles();
  const { authContext } = useContext(AuthContext);
  const defaultValue = authContext.token !== null;
  const [secureAuth, setSecureAuth] = useState(defaultValue);

  const getParams = queryString.parse(location.search);

  if (secureAuth === true) {
    authContext.userData.then(data => {
      if (data === null) {
        window.location = '/login';
      }
      setSecureAuth(data.success);
    });
  }

  if (secureAuth) {
    return (
      <Box className={classes.dashboard}>
        <Box className={classes.upDivWrapper}>
          <Avatar
            alt="Remy Sharp"
            src="http://placekitten.com/200/300"
            className={classes.avatar}
          />
          <Typography variant="h3" color="primary" gutterBottom>
            Welcome Sego!
          </Typography>
        </Box>
        <Grid container className={classes.gridWrapper}>
          <Grid item xs="12" sm="3" lg="2">
            <List>
              <ListItem button component="a" href="/profile">
                <ListItemIcon>
                  <AccountCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="My profile" />
              </ListItem>
              <ListItem button component="a" href="/chat">
                <ListItemIcon>
                  <ChatIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItem>
              <ListItem button component="a" href="/visits">
                <ListItemIcon>
                  <VisibilityIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Visits" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs="12" sm="9" lg="10" className={classes.columnCTAS}>
            <Typography
              variant="h3"
              color=""
              gutterBottom
              align="center"
              className={classes.findMatchTitle}
            >
              Find your perfect Match
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs="12" sm="6">
                <Paper elevation={3} className={classes.paperCTA}>
                  <FavoriteIcon fontSize="large" color="secondary" />
                  <Typography variant="h4" color="secondary" gutterBottom>
                    Suggestions
                  </Typography>
                  <Typography>
                    We gathered profiles that could be a good fit for you!
                    Here's a bunch
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs="12" sm="6">
                <Paper elevation={3} className={classes.paperCTA}>
                  <SearchIcon fontSize="large" color="secondary" />
                  <Typography variant="h4" color="secondary" gutterBottom>
                    Search
                  </Typography>
                  <Typography>
                    You can filter users according to your interests, age,
                    distance... Have fun!
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }
  return (
    <>
      <Box className={classes.homeWrapper}>
        <Box className={classes.bgImage}>
          <Box className={classes.homeTextDiv}>
            <Typography variant="h3" color="primary" gutterBottom>
              Make the first move
            </Typography>
            <Typography>
              Start meeting new people in your area! If you already have an
              account, sign in to use Matcha.
            </Typography>
            <div className={classes.CTAWrapper}>
              <Fab
                variant="extended"
                color="secondary"
                aria-label="add"
                className={classes.CTA}
                href="/signup"
              >
                Sign up
              </Fab>
              <Fab
                variant="extended"
                aria-label="add"
                className={classes.signIn + ' ' + classes.CTA}
                href="/login"
              >
                Sign in
              </Fab>
            </div>
          </Box>
        </Box>
      </Box>
      <Toaster getParams={getParams} />
    </>
  );
};
Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
};
export default Home;
