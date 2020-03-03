import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CurrentPictures from './current-pictures';
import FormCheckBox from './formCheckBox';
import InputTextShort from './inputTextShort';

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

const TabPanelProfileAbout = ({
  value,
  index,
  classes,
  profile,
  isChecked,
  handleProfileChange,
  handleSubmitParameters,
  handleFileUpload,
  handleChangeProfileImage,
  handleDeleteImage,
}) => {
  return (
    <TabPanel value={value} index={index}>
      <Grid container>
        <Grid item sm={8} className={classes.gridColumnProfile}>
          <FormCheckBox
            title="Gender"
            classes={classes}
            isChecked={isChecked}
            handleProfileChange={handleProfileChange}
            name="gender"
            label={[
              'Woman',
              'Man',
              'Cis Woman',
              'Cis Man',
              'Trans Woman',
              'Trans Man',
              'Non-binary',
            ]}
          />
          <FormCheckBox
            title="I am looking for"
            classes={classes}
            isChecked={isChecked}
            handleProfileChange={handleProfileChange}
            name="sexualOrientation"
            label={[
              'Woman',
              'Man',
              'Cis Woman',
              'Cis Man',
              'Trans Woman',
              'Trans Man',
              'Non-binary',
            ]}
          />
          <InputTextShort
            classes={classes}
            Typography={Typography}
            Box={Box}
            TextField={TextField}
            profile={profile}
            handleProfileChange={handleProfileChange}
            name="description"
            value={profile.description}
            title="My self-summary"
            type="text"
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
        <Grid item sm={4} className={classes.gridColumnProfile}>
          <Typography variant="subtitle1">
            <Box fontWeight="fontWeightBold">My pictures</Box>
          </Typography>
          <Grid container>
            <Grid item xsm={12} className={classes.gridPicturesWrapper}>
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
                <Box className={classes.modifyPictureButton}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    size="large"
                    startIcon={<AddAPhotoIcon />}
                  >
                    Upload a picture
                  </Button>
                  <input
                    label="upload file"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileUpload}
                    className={classes.uploadInput}
                  />
                </Box>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default TabPanelProfileAbout;
