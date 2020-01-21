import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CurrentPictures from './current-pictures';
import FormCheckBox from './formCheckBox';
import InputTextShort from './inputTextShort';

function TabPanel(props) {
  const { children, valueTab, index } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={valueTab !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

const TabPanelProfileAbout = ({
  valueTab,
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
    <TabPanel valueTab={valueTab} index={index}>
      <Grid container>
        <Grid
          container
          sm={8}
          bgcolor="primary.main"
          direction="column"
          className={classes.gridColumnProfile}
        >
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
        <Grid container sm={4} className={classes.gridColumnProfile}>
          <Typography variant="subtitle1">
            <Box fontWeight="fontWeightBold">My pictures</Box>
          </Typography>
          <Grid container>
            <Grid container xsm={12}>
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
  );
};

export default TabPanelProfileAbout;
