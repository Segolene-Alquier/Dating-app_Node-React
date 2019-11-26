import React, { useContext, useEffect } from 'react';
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
import FormGroup from '@material-ui/core/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { AuthContext } from '../app/AuthContext';
import UseProfileForm from './profile-container';
import CurrentPictures from './components/current-pictures';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  wrapperProfile: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1500px',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerUpProfile: {
    maxWidth: '1500px',
  },
  gridColumnProfile: {
    padding: theme.spacing(1),
  },
  picture: {
    padding: theme.spacing(1),
    position: 'relative',
    maxWidth: '150px',
  },
  deleteButtonPicture: {
    position: 'absolute',
    top: '10px',
    right: '10px',
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
    overflow: 'hidden',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    padding: theme.spacing(1),
    textAlign: 'center',
    fontSize: '1em',
  },
  uploadInput: {
    fontSize: '100px',
    position: 'absolute',
    left: '0',
    top: '0',
    opacity: '0',
  },
  summaryField: {
    width: '90%',
  },
  formControl: {
    marginBottom: theme.spacing(3),
  },
  textField: {
    maxWidth: '400px',
    width: '100%',
  },
  interestChips: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  paperAccount: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    padding: theme.spacing(3, 2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexGrow: '1',
  },
  divAccount: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  buttonAccount: {
    width: '100%',
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
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Profile = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  const {
    handleProfileChange,
    handleDeleteImage,
    profile,
    submitFile,
    handleFileUpload,
  } = UseProfileForm(authContext.userData, authContext.token);
  const {
    birthDate,
    description,
    email,
    firstname,
    // gender,
    images,
    interests,
    location,
    notificationMail,
    notificationPush,
    popularityRate,
    profilePicture,
    sexualOrientation,
    surname,
    username,
  } = profile;

  // useEffect(() => {

  // });

  console.log(profile);

  // change tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //   change genders
  const [gender, setGender] = React.useState({
    '1': true,
    '4': true,
  });
  const handleChangeGender = name => event => {
    setGender({ ...gender, [name]: event.target.checked });
  };
  // sxual preference
  const [sexualPreference, setSexualPreference] = React.useState({
    '2': true,
    '6': true,
  });
  const handleSexualPreference = name => event => {
    setSexualPreference({ ...sexualPreference, [name]: event.target.checked });
  };

  // strings
  // const handleInputText = event => {
  //   console.log('kikou')
  //   event.persist();
  //   const newInput = {
  //     ...profile,
  //     [event.target.name]: event.target.value,
  //   };
  //   setProfile(newInput);
  // };

  const [notif, setNotif] = React.useState('bothNotif');
  const handleChangeNotif = (event, newNotif) => {
    setNotif(newNotif);
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };
  return (
    <>
      <Box className={classes.boxUpProfile}>
        <Grid container className={classes.containerUpProfile}>
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
      <div className={classes.wrapperProfile}>
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
            <Grid
              container
              sm={8}
              bgcolor="primary.main"
              direction="column"
              className={classes.gridColumnProfile}
            >
              <Typography variant="subtitle1">
                <Box fontWeight="fontWeightBold">Gender</Box>
              </Typography>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={gender['1']}
                        onChange={handleChangeGender('1')}
                        value="Woman"
                      />
                    }
                    label="Woman"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={gender['2']}
                        onChange={handleChangeGender('2')}
                        value="Man"
                      />
                    }
                    label="Man"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={gender['3']}
                        onChange={handleChangeGender('3')}
                        value="Cis Woman"
                      />
                    }
                    label="Cis Woman"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={gender['4']}
                        onChange={handleChangeGender('4')}
                        value="Cis Man"
                      />
                    }
                    label="Cis Man"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={gender['5']}
                        onChange={handleChangeGender('5')}
                        value="Trans Woman"
                      />
                    }
                    label="Trans Woman"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={gender['6']}
                        onChange={handleChangeGender('6')}
                        value="Trans Man"
                      />
                    }
                    label="Trans Man"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={gender['7']}
                        onChange={handleChangeGender('7')}
                        value="Non-binary"
                      />
                    }
                    label="Non-binary"
                  />
                </FormGroup>
              </FormControl>
              <Typography variant="subtitle1">
                <Box fontWeight="fontWeightBold">I am looking for</Box>
              </Typography>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sexualPreference['1']}
                        onChange={handleSexualPreference('1')}
                        value="Woman"
                      />
                    }
                    label="Woman"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sexualPreference['2']}
                        onChange={handleSexualPreference('2')}
                        value="Man"
                      />
                    }
                    label="Man"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sexualPreference['3']}
                        onChange={handleSexualPreference('3')}
                        value="Cis Woman"
                      />
                    }
                    label="Cis Woman"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sexualPreference['4']}
                        onChange={handleSexualPreference('4')}
                        value="Cis Man"
                      />
                    }
                    label="Cis Man"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sexualPreference['5']}
                        onChange={handleSexualPreference('5')}
                        value="Trans Woman"
                      />
                    }
                    label="Trans Woman"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sexualPreference['6']}
                        onChange={handleSexualPreference('6')}
                        value="Trans Man"
                      />
                    }
                    label="Trans Man"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sexualPreference['7']}
                        onChange={handleSexualPreference('7')}
                        value="Non-binary"
                      />
                    }
                    label="Non-binary"
                  />
                </FormGroup>
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
            <Grid container sm={4} className={classes.gridColumnProfile}>
              <Typography variant="subtitle1">
                <Box fontWeight="fontWeightBold">My pictures</Box>
              </Typography>
              <Grid container>
                <CurrentPictures
                  classes={classes}
                  Grid={Grid}
                  pictures={profile.images}
                  Box={Box}
                  Button={Button}
                  handleDeleteImage={handleDeleteImage}
                />
                <Grid container xs={6} sm={6} className={classes.picture}>
                  <Box
                    bgcolor="secondary.main"
                    width="100%"
                    className={classes.modifyPictureButton}
                  >
                    <p>Upload a picture</p>
                    <input
                      label="upload file"
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleFileUpload}
                      className={classes.uploadInput}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <form className={classes.container} noValidate autoComplete="off">
            <Grid container>
              <Grid
                container
                sm={6}
                bgcolor="primary.main"
                direction="column"
                className={classes.gridColumnProfile}
              >
                <div className={classes.formControl}>
                  <Typography variant="subtitle1">
                    <Box fontWeight="fontWeightBold">Firstname</Box>
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name="firstname"
                    value={profile.firstname}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className={classes.formControl}>
                  <Typography variant="subtitle1">
                    <Box fontWeight="fontWeightBold">Surname</Box>
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                  />
                </div>
                <div className={classes.formControl}>
                  <Typography variant="subtitle1">
                    <Box fontWeight="fontWeightBold">Username</Box>
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                  />
                </div>
                <div className={classes.formControl}>
                  <Typography variant="subtitle1">
                    <Box fontWeight="fontWeightBold">Email</Box>
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    type="email"
                  />
                </div>
                <div className={classes.formControl}>
                  <Typography variant="subtitle1">
                    <Box fontWeight="fontWeightBold">Location</Box>
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                  />
                </div>
                <div className={classes.formControl}>
                  <Typography variant="subtitle1">
                    <Box fontWeight="fontWeightBold">Birthdate</Box>
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    type="date"
                  />
                </div>
              </Grid>
              <Grid
                container
                sm={6}
                direction="column"
                className={classes.gridColumnProfile}
              >
                <div className={classes.formControl}>
                  <Typography variant="subtitle1">
                    <Box fontWeight="fontWeightBold">Interests</Box>
                  </Typography>
                  <div className={classes.interestChips}>
                    <Chip
                      label="Yoga"
                      onDelete={handleDelete}
                      color="primary"
                    />
                    <Chip
                      label="Food"
                      onDelete={handleDelete}
                      color="primary"
                    />
                    <Chip
                      label="Doggos"
                      onDelete={handleDelete}
                      color="primary"
                    />
                    <Chip
                      label="Coding"
                      onDelete={handleDelete}
                      color="primary"
                    />
                    <Chip
                      label="Fighting patriarchy"
                      onDelete={handleDelete}
                      color="primary"
                    />
                    <div>
                      <TextField
                        id="standard-basic"
                        placeholder="Add interest"
                        margin="normal"
                      />
                      <Fab
                        color="secondary"
                        aria-label="add"
                        className={classes.fab}
                        size="small"
                      >
                        <AddIcon />
                      </Fab>
                    </div>
                  </div>
                </div>
                <Typography variant="subtitle1">
                  <Box fontWeight="fontWeightBold">Notifications</Box>
                </Typography>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <RadioGroup
                    aria-label="notif"
                    name="notif"
                    value={notif}
                    onChange={handleChangeNotif}
                    row
                  >
                    <FormControlLabel
                      value="mailNotif"
                      control={<Radio />}
                      label="Mail"
                    />
                    <FormControlLabel
                      value="pushNotif"
                      control={<Radio />}
                      label="Push"
                    />
                    <FormControlLabel
                      value="bothNotif"
                      control={<Radio />}
                      label="Both"
                    />
                    <FormControlLabel
                      value="noNotif"
                      control={<Radio />}
                      label="None"
                    />
                  </RadioGroup>
                </FormControl>
                <Box>
                  <Button variant="contained" color="secondary" size="large">
                    Save changes
                  </Button>
                </Box>
                <Paper className={classes.paperAccount}>
                  <Typography variant="h5" component="h5">
                    Account security
                  </Typography>
                  <div>
                    <Box className={classes.divAccount}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonAccount}
                        size="large"
                      >
                        Change password
                      </Button>
                    </Box>
                    <Box className={classes.divAccount}>
                      <Button
                        className={classes.buttonAccount}
                        variant="outlined"
                        color="secondary"
                        size="large"
                      >
                        Delete my account
                      </Button>
                    </Box>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </form>
        </TabPanel>
      </div>
    </>
  );
};

export default Profile;
