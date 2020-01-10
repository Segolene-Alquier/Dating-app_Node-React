import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  hero: {
    backgroundColor: 'hsla(230,84%,63%,1)',
    width: '100%',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Title = ({ textTitle }) => {
  const classes = useStyles();

  return (
    <div className={classes.hero}>
      <h1>{textTitle}</h1>
    </div>
  );
};

export default Title;
