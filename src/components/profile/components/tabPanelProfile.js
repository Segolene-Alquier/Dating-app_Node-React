import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CurrentPictures from './current-pictures';

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const TabPanelProfile = ({
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
          <Typography variant="subtitle1">
            <Box fontWeight="fontWeightBold">Gender</Box>
          </Typography>
          <FormControl component="fieldset" className={classes.formControl}>
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
          <FormControl component="fieldset" className={classes.formControl}>
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

export default TabPanelProfile;
