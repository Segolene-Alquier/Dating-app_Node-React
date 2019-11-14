import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

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
  picture: {
    padding: theme.spacing(1),
  },
  profilePicture: {
    border: '3px solid',
    borderColor: theme.palette.secondary.main,
    boxSizing: 'border-box',
  },
  tabs: {
    margin: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(1),
  },
  modifyPictureButton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    padding: theme.spacing(1),
    textAlign: 'center',
    fontSize: '1em',
  },
  summaryField: {
    width: '90%',
  },
  formControl: {
    marginBottom: theme.spacing(3),
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
  const [gender, setGender] = React.useState('female');
  const handleChangeGender = (event, newGender) => {
    setGender(newGender);
  };
  const [sexualPreference, setSexualPreference] = React.useState('both');
  const handleSexualPreference = (event, newSexualPreference) => {
    setSexualPreference(newSexualPreference);
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
            <Typography variant="subtitle1">
              <Box fontWeight="fontWeightBold">Gender</Box>
            </Typography>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={handleChangeGender}
                row
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="non-binary"
                  control={<Radio />}
                  label="Non-binary"
                />
              </RadioGroup>
            </FormControl>
            <Typography variant="subtitle1">
              <Box fontWeight="fontWeightBold">I am looking for</Box>
            </Typography>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={sexualPreference}
                onChange={handleSexualPreference}
                row
              >
                <FormControlLabel
                  value="femalePreference"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="malePreference"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="both"
                  control={<Radio />}
                  label="Both"
                />
              </RadioGroup>
            </FormControl>
            <Typography variant="subtitle1">
              <Box fontWeight="fontWeightBold">My self-summary</Box>
            </Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows="4"
              className={classes.summaryField}
              margin="normal"
              variant="outlined"
            />
            <Box>
              <Button variant="contained" color="secondary" size="medium">
                Save changes
              </Button>
            </Box>
          </Grid>
          <Grid container sm={4}>
            <Typography variant="subtitle1">
              <Box fontWeight="fontWeightBold">My pictures</Box>
            </Typography>
            <Grid container>
              <Grid container xs={6} sm={6} className={classes.picture}>
                <img
                  src="https://image.noelshack.com/fichiers/2019/46/4/1573736912-mamie.jpeg"
                  alt="My profile"
                  width="100%"
                />
              </Grid>
              <Grid container xs={6} sm={6} className={classes.picture}>
                <img
                  className={classes.profilePicture}
                  src="https://image.noelshack.com/fichiers/2019/46/4/1573736912-mamie.jpeg"
                  alt="My profile"
                  width="100%"
                />
              </Grid>
              <Grid container xs={6} sm={6} className={classes.picture}>
                <img
                  src="https://image.noelshack.com/fichiers/2019/46/4/1573736912-mamie.jpeg"
                  alt="My profile"
                  width="100%"
                />
              </Grid>
              <Grid container xs={6} sm={6} className={classes.picture}>
                <img
                  src="https://image.noelshack.com/fichiers/2019/46/4/1573736912-mamie.jpeg"
                  alt="My profile"
                  width="100%"
                />
              </Grid>
              <Grid container xs={6} sm={6} className={classes.picture}>
                <img
                  src="https://image.noelshack.com/fichiers/2019/46/4/1573736912-mamie.jpeg"
                  alt="My profile"
                  width="100%"
                />
              </Grid>
              <Grid container xs={6} sm={6} className={classes.picture}>
                <Box
                  bgcolor="secondary.main"
                  width="100%"
                  className={classes.modifyPictureButton}
                >
                  <p>Modifier les photos</p>
                </Box>
              </Grid>
            </Grid>
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
