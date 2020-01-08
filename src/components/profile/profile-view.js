import React, { useContext, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthContext } from '../app/AuthContext';
import UseProfileForm from './profile-container';
import CurrentPictures from './components/current-pictures';
import Map from './components/location/map';
import InputTextShort from './components/inputTextShort';
import AddressAutocomplete from './components/location/address-autocomplete';
import ModalCrop from './components/modal';
import CropperImg from './components/cropper/cropper';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  progress: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  gridPicture: {
    // backgroundColor: 'yellow',
  },
  pictureContainer: {
    padding: theme.spacing(1),
    // backgroundColor: 'red',
    // paddingBottom: '100%',
    // height: '0',
    // position: 'relative',
    width: '100%',
    // maxWidth: '150px',
  },
  pictureContainer2: {
    overflow: 'hidden',
    // padding: theme.spacing(1),
    backgroundColor: 'green',
    paddingBottom: '100%',
    height: '0',
    position: 'relative',
    width: '100%',
  },
  pictureButtonContainer: {
    overflow: 'hidden',
    // padding: theme.spacing(1),
    backgroundColor: 'green',
    paddingBottom: '100%',
    height: '0',
    position: 'relative',
    width: '100%',
  },
  picture: {
    objectFit: 'cover',
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
    objectFit: 'cover',
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
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paperAccount: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(5, 2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.A300,
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
    loaded,
    submitFile,
    handleFileUpload,
    handleChangeProfileImage,
    handleInterestChange,
    handleChangeLocation,
    handleSubmitParameters,
    isChecked,
    getAge,
    fetchInterests,
    showModal,
    setShowModal,
    imageToSave,
    setImageToSave,
    croppedImage,
    setCroppedImage,
    upload,
    finalImage,
    setFinalImage,
    sendCroppedImageServer,
  } = UseProfileForm(authContext.userData, authContext.token);
  const {
    birthDate,
    description,
    email,
    firstname,
    gender,
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
    interestNames,
  } = profile;

  // change tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loaded === false) {
    return (
      <div className={classes.progress}>
        <CircularProgress color="secondary" />
      </div>
    );
  }
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
              src={
                profile.profilePicture ||
                'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
              }
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
              <div>{profile.firstname}</div>
              <div>
                <span>
                  {profile.birthDate
                    ? getAge(
                        new Date(profile.birthDate).toISOString().split('T')[0],
                      )
                    : 'nope'}
                </span>
                | <span>Paris</span>
              </div>
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
        <form>
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
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked(1, 'gender')}
                          onChange={handleProfileChange}
                          name="gender"
                          value="1"
                        />
                      }
                      label="Woman"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked(2, 'gender')}
                          onChange={handleProfileChange}
                          name="gender"
                          value="2"
                        />
                      }
                      label="Man"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked(3, 'gender')}
                          onChange={handleProfileChange}
                          name="gender"
                          value="3"
                        />
                      }
                      label="Cis Woman"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked(4, 'gender')}
                          onChange={handleProfileChange}
                          name="gender"
                          value="4"
                        />
                      }
                      label="Cis Man"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked(5, 'gender')}
                          onChange={handleProfileChange}
                          name="gender"
                          value="5"
                        />
                      }
                      label="Trans Woman"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked(6, 'gender')}
                          onChange={handleProfileChange}
                          name="gender"
                          value="6"
                        />
                      }
                      label="Trans Man"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked(7, 'gender')}
                          onChange={handleProfileChange}
                          name="gender"
                          value="7"
                        />
                      }
                      label="Non-binary"
                    />
                  </FormGroup>
                </FormControl>
                <Typography variant="subtitle1">
                  <Box fontWeight="fontWeightBold">I am looking for</Box>
                </Typography>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked(1, 'sexualOrientation')}
                          onChange={handleProfileChange}
                          name="sexualOrientation"
                          value="1"
                        />
                      }
                      label="Woman"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked(2, 'sexualOrientation')}
                          onChange={handleProfileChange}
                          name="sexualOrientation"
                          value="2"
                        />
                      }
                      label="Man"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked(3, 'sexualOrientation')}
                          onChange={handleProfileChange}
                          name="sexualOrientation"
                          value="3"
                        />
                      }
                      label="Cis Woman"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked(4, 'sexualOrientation')}
                          onChange={handleProfileChange}
                          name="sexualOrientation"
                          value="4"
                        />
                      }
                      label="Cis Man"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked(5, 'sexualOrientation')}
                          onChange={handleProfileChange}
                          name="sexualOrientation"
                          value="5"
                        />
                      }
                      label="Trans Woman"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked(6, 'sexualOrientation')}
                          onChange={handleProfileChange}
                          name="sexualOrientation"
                          value="6"
                        />
                      }
                      label="Trans Man"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked(7, 'sexualOrientation')}
                          onChange={handleProfileChange}
                          name="sexualOrientation"
                          value="7"
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
                  name="description"
                  onChange={handleProfileChange}
                  value={profile.description}
                />
                <Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    onClick={handleSubmitParameters}
                  >
                    Save changes
                  </Button>
                </Box>
              </Grid>
              <Grid container sm={4} className={classes.gridColumnProfile}>
                <Typography variant="subtitle1">
                  <Box fontWeight="fontWeightBold">My pictures</Box>
                </Typography>
                {/* <CropperImg /> */}

                <Grid container>
                  <Grid container className={classes.gridPicture} xsm={12}>
                    <CurrentPictures
                      classes={classes}
                      Grid={Grid}
                      pictures={profile.images}
                      profilePicture={profile.profilePicture}
                      Box={Box}
                      Button={Button}
                      handleDeleteImage={handleDeleteImage}
                      handleChangeProfileImage={handleChangeProfileImage}
                    />
                    {profile.images && profile.images.length < 5 ? (
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        xl={4}
                        className={classes.pictureContainer}
                      >
                        <div className={classes.pictureButtonContainer}>
                          <Box
                            bgcolor="secondary.main"
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
                        </div>
                      </Grid>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box className={classes.container} noValidate autoComplete="off">
              <Grid container>
                <Grid
                  container
                  sm={6}
                  bgcolor="primary.main"
                  direction="column"
                  className={classes.gridColumnProfile}
                >
                  <InputTextShort
                    classes={classes}
                    Typography={Typography}
                    Box={Box}
                    TextField={TextField}
                    profile={profile}
                    handleProfileChange={handleProfileChange}
                    name="firstname"
                    value={profile.firstname}
                    title="Firstname"
                    type="text"
                  />
                  <InputTextShort
                    classes={classes}
                    Typography={Typography}
                    Box={Box}
                    TextField={TextField}
                    profile={profile}
                    handleProfileChange={handleProfileChange}
                    name="surname"
                    value={profile.surname}
                    title="Surname"
                    type="text"
                  />
                  <InputTextShort
                    classes={classes}
                    Typography={Typography}
                    Box={Box}
                    TextField={TextField}
                    profile={profile}
                    handleProfileChange={handleProfileChange}
                    name="username"
                    value={profile.username}
                    title="Username"
                    type="text"
                  />
                  <InputTextShort
                    classes={classes}
                    Typography={Typography}
                    Box={Box}
                    TextField={TextField}
                    profile={profile}
                    handleProfileChange={handleProfileChange}
                    name="email"
                    value={profile.email}
                    title="Email"
                    type="email"
                  />
                  <Typography variant="subtitle1">
                    <Box fontWeight="fontWeightBold">Location</Box>
                  </Typography>
                  <div className={classes.formControl}>
                    {profile.location ? (
                      <>
                        <AddressAutocomplete
                          classes={classes}
                          // className={classes.textField}
                          handleChangeLocation={handleChangeLocation}
                        />
                        <Map
                          lat={profile.location[0]}
                          lon={profile.location[1]}
                        />
                      </>
                    ) : null}
                  </div>
                  <InputTextShort
                    classes={classes}
                    Typography={Typography}
                    Box={Box}
                    TextField={TextField}
                    profile={profile}
                    handleProfileChange={handleProfileChange}
                    name="birthDate"
                    value={
                      new Date(profile.birthDate).toISOString().split('T')[0]
                    }
                    title="Birthdate"
                    type="date"
                  />
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
                      <div>
                        <Autocomplete
                          multiple
                          options={interestNames}
                          getOptionLabel={option => option.name}
                          defaultValue={interests.map(interest => {
                            return { name: interest };
                          })}
                          style={{ width: 300 }}
                          onChange={handleProfileChange}
                          name="interest"
                          renderInput={params => (
                            <TextField
                              {...params}
                              variant="outlined"
                              placeholder="Add interest"
                              fullWidth
                            />
                          )}
                        />
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
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={notificationMail === true}
                            onChange={handleProfileChange}
                            name="notificationMail"
                            value="notificationMail"
                          />
                        }
                        label="Mail"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={notificationPush === true}
                            onChange={handleProfileChange}
                            name="notificationPush"
                            value="notificationPush"
                          />
                        }
                        label="Push"
                      />
                    </FormGroup>
                  </FormControl>
                  <Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={handleSubmitParameters}
                    >
                      Save changes
                    </Button>
                  </Box>
                  <Paper className={classes.paperAccount}>
                    <Typography variant="h5" component="h5" paragraph="true">
                      <Box fontWeight="fontWeightBold">Account security</Box>
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
            </Box>
          </TabPanel>
        </form>
      </div>
      <ModalCrop
        showModal={showModal}
        setShowModal={setShowModal}
        imageToSave={imageToSave}
        croppedImage={croppedImage}
        setCroppedImage={setCroppedImage}
        upload={upload}
        finalImage={finalImage}
        setFinalImage={setFinalImage}
        sendCroppedImageServer={sendCroppedImageServer}
        // setImageToSave={setImageToSave}
      />
    </>
  );
};

export default Profile;
