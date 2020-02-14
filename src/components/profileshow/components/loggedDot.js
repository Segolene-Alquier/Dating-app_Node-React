import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  loggedDot: {
    marginTop: '10px',
    marginBottom: '3px',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#64dd17',
  },
  notLoggedDot: {
    marginTop: '10px',
    marginBottom: '3px',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#b0bec5',
  },
  dotDateWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  lastConnectionDate: {
    marginLeft: theme.spacing(1),
    fontSize: '0.7em',
  },
}));

const LoggedDot = ({ loggedState, lastConnection, displayLast }) => {
  const classes = useStyles();
  if (loggedState === true) {
    return (
      <span>
        <div className={classes.loggedDot} />
      </span>
    );
  }
  return (
    <span className={classes.dotDateWrapper}>
      <div className={classes.notLoggedDot} />
      {displayLast ? (
        <div className={classes.lastConnectionDate}>
          Disconnected {moment(lastConnection).fromNow()}
        </div>
      ) : null}
    </span>
  );
};

export default LoggedDot;
