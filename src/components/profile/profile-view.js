import React from 'react';
import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
// import FaceIcon from '@material-ui/icons/Face';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
// import PropTypes from 'prop-types';

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
  tabs: {
    margin: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(1),
  },
}));

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      //   {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Profile = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      <Divider className={classes.divider} />
      <Tabs
        width="100%"
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        className={classes.tabs}
      >
        <Tab label="About me" {...a11yProps(0)} />
        <Tab label="Parameters" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Grid container>
          <Grid container sm={8} bgcolor="primary.main" direction="column">
            Coucou tout a propos de moi
          </Grid>
          <Grid container sm={4}>
            WIP
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container>
          <Grid container sm={8} bgcolor="primary.main" direction="column">
            Mes petites infos
          </Grid>
          <Grid container sm={4}>
            WIP
          </Grid>
        </Grid>
      </TabPanel>
    </>
  );
};

export default Profile;
