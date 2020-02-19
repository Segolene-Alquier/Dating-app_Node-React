import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Fab } from '@material-ui/core';
import Toaster from '../toaster/index';
import Background from '../../assets/images/home-bg-1.jpg';

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
}));

const Home = ({ location }) => {
  const classes = useStyles();

  const getParams = queryString.parse(location.search);
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
