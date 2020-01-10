import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import MediaCard from './components/media-card';
import _ from 'lodash';
import VisitContainer from './visit-container';
import Title from './components/title';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1500px',
    marginTop: '10px',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Visit = ({ computedMatch }) => {
  const visitedUsername = computedMatch.params.username;

  const { visitedProfile, loaded } = VisitContainer(visitedUsername);
  const classes = useStyles();

  if (loaded === false) {
    return (
      <div className={classes.progress}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <>
      <Title textTitle={'History of visit'} />
      <div className={classes.wrapper}>
        <Grid container spacing={3}>
          {_.map(visitedProfile, field => (
            <Grid item xs={12} sm={4} md={3} lg={2} className={classes.center}>
              <MediaCard field={field} className={classes.fullsize} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Visit;
