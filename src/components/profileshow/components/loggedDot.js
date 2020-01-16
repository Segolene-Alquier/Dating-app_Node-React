import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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

const LoggedDot = ({ loggedState }) => {
  const classes = useStyles();
  if (loggedState === true) {
    return (
      <span>
        <div className={classes.loggedDot} />
      </span>
    );
  }
  return (
    <span>
      <div className={classes.notLoggedDot} />
    </span>
  );
};

export default LoggedDot;
