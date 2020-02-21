import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  hero: {
    backgroundColor: '#f4f4f4',
    width: '100%',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

const Title = ({ textTitle }) => {
  const classes = useStyles();

  return (
    <div className={classes.hero}>
      <Typography variant="h4" color="primary">
        {textTitle}
      </Typography>
    </div>
  );
};

export default Title;
