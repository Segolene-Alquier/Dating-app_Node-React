import React from 'react';
import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
// import FaceIcon from '@material-ui/icons/Face';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
// import Mamie from './../../assets/images/mamie.jpeg';

// import { sizing } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
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
  },
}));

const Profile = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.boxUpProfile}>
        <Grid container>
          <Grid
            container
            bgcolor="secondary.main"
            xs={5}
            sm={3}
            justify="center"
          >
            <img
              src="https://image.noelshack.com/fichiers/2019/46/4/1573736912-mamie.jpeg"
              alt="My profile"
              width="50%"
            />
          </Grid>
          <Grid container bgcolor="secondary.main" xs={7} sm={9}>
            <Grid
              container
              bgcolor="secondary.main"
              xs={6}
              sm={9}
              direction="column"
              justify="flex-end"
            >
              <div>Ségolène</div>
              <div>27 ans | Paris</div>
            </Grid>
            <Grid
              container
              bgcolor="secondary.main"
              xs={6}
              sm={3}
              justify="center"
              alignItems="flex-end"
            >
              <Avatar className={classes.avatar}>78 %</Avatar>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Divider variant="middle" />
    </>
  );
};

export default Profile;
