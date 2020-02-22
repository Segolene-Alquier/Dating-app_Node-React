import React, { useContext, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import queryString from 'query-string';
import { AuthContext } from '../app/AuthContext';
import UseProfileForm from './profile-container';
import UpperBoxProfile from './components/upperBoxProfile';
import TabPanelProfileAbout from './components/tabPanelProfileAbout';
import TabPanelProfileParameters from './components/tabPanelProfileParameters';
import { toast } from 'react-toastify';
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback';
import ModalCrop from './components/modal';

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
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
  containerUpProfileLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  containerUpProfileLeftInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  containerUpProfileRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  containerUpProfileRightFabs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  gridColumnProfile: {
    padding: theme.spacing(1),
  },
  gridPicturesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pictureContainer: {
    padding: theme.spacing(1),
    position: 'relative',
    width: '100%',
    height: 'fit-content',
  },
  pictureButtonContainer: {
    overflow: 'hidden',
    position: 'relative',
    height: 'fit-content',
    width: '100%',
  },
  picture: {
    objectFit: 'cover',
  },
  deleteButtonPicture: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '0px',
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
  tab: {
    opacity: '1',
    '&:focus': {
      outline: 'none',
    },
  },
  activeTab: {
    opacity: '1',
    borderBottom: '3px solid',
    borderBottomColor: theme.palette.secondary.main,
    '&:focus': {
      outline: 'none',
    },
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Profile = params => {
  const classes = useStyles();
  const { authContext } = useContext(AuthContext);
  const locationParams = params.location;
  const getParams = queryString.parse(locationParams.search);

  const {
    handleProfileChange,
    handleDeleteImage,
    profile,
    loaded,
    handleFileUpload,
    handleChangeProfileImage,
    handleChangeLocation,
    handleChangeCity,
    handleSubmitParameters,
    isChecked,
    getAge,
    deleteUser,
    showModal,
    setShowModal,
    imageToSave,
    croppedImage,
    setCroppedImage,
    upload,
    finalImage,
    sendCroppedImageServer,
  } = UseProfileForm(authContext.userData, authContext.token);
  const {
    interests,
    notificationMail,
    notificationPush,
    interestNames,
  } = profile;

  // change tabs
  const [valueTab, setValueTab] = React.useState(0);
  const handleChange = (event, newValueTab) => {
    setValueTab(newValueTab);
  };

  const [toastDebounced] = useDebouncedCallback(() => {
    if (getParams.message === 'profile_not_completed') {
      const toasterType = 'warning';
      const toasterMessage =
        'You need to complete your profile in order to access to other profiles';
      toast(toasterMessage, { type: toasterType });
    }
  });
  useEffect(() => {
    toastDebounced();
  }, [toastDebounced]);

  if (loaded === false) {
    return (
      <div className={classes.progress}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <>
      <UpperBoxProfile
        classes={classes}
        profile={profile}
        getAge={getAge}
        handleChangeCity={handleChangeCity}
        type="private"
      />
      <Divider className={classes.divider} />
      <div className={classes.wrapperProfile}>
        <form>
          <Tabs
            width="100%"
            value={valueTab}
            onChange={handleChange}
            aria-label="simple tabs example"
            className={classes.tabs}
          >
            <Tab
              icon={
                valueTab === 0 ? (
                  <InfoIcon color="secondary" />
                ) : (
                  <InfoIcon color="primary" />
                )
              }
              className={valueTab === 0 ? classes.activeTab : classes.tab}
              label="About me"
              {...a11yProps(0)}
            />
            <Tab
              icon={
                valueTab === 1 ? (
                  <SettingsIcon color="secondary" />
                ) : (
                  <SettingsIcon color="primary" />
                )
              }
              className={valueTab === 1 ? classes.activeTab : classes.tab}
              label="Parameters"
              {...a11yProps(1)}
            />
          </Tabs>
          <TabPanelProfileAbout
            value={valueTab}
            index={0}
            classes={classes}
            profile={profile}
            isChecked={isChecked}
            handleProfileChange={handleProfileChange}
            handleSubmitParameters={handleSubmitParameters}
            handleFileUpload={handleFileUpload}
            handleChangeProfileImage={handleChangeProfileImage}
            handleDeleteImage={handleDeleteImage}
          />
          <TabPanelProfileParameters
            value={valueTab}
            index={1}
            classes={classes}
            profile={profile}
            isChecked={isChecked}
            handleProfileChange={handleProfileChange}
            handleSubmitParameters={handleSubmitParameters}
            interests={interests}
            interestNames={interestNames}
            handleChangeLocation={handleChangeLocation}
            notificationMail={notificationMail}
            notificationPush={notificationPush}
            deleteUser={deleteUser}
          />
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
        sendCroppedImageServer={sendCroppedImageServer}
      />
    </>
  );
};

export default Profile;
