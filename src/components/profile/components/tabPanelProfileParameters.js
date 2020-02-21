import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { toast } from 'react-toastify';
import InputTextShort from './inputTextShort';
import AddressAutocomplete from './location/address-autocomplete';
import Map from './location/map';
import useForgotPasswordForm from '../../forgotpassword/forgotpassword-container';

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

const TabPanelProfileParameters = ({
  value,
  index,
  classes,
  profile,
  isChecked,
  handleProfileChange,
  handleSubmitParameters,
  interests,
  interestNames,
  handleChangeLocation,
  notificationMail,
  notificationPush,
  deleteUser,
}) => {
  const { sendForgotPassword } = useForgotPasswordForm(() =>
    toast.success('You received a reset password link by Email'),
  );

  return (
    <TabPanel value={value} index={index}>
      <Box noValidate autoComplete="off">
        <Grid container>
          <Grid item sm={6} className={classes.gridColumnProfile}>
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
                  <Map lat={profile.location[0]} lon={profile.location[1]} />
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
              value={new Date(profile.birthDate).toISOString().split('T')[0]}
              title="Birthdate"
              type="date"
            />
          </Grid>
          <Grid item sm={6} className={classes.gridColumnProfile}>
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
            <FormControl component="fieldset" className={classes.formControl}>
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
              <Typography variant="h5" component="h5">
                <Box fontWeight="fontWeightBold">Account security</Box>
              </Typography>
              <div>
                <Box className={classes.divAccount}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.buttonAccount}
                    size="large"
                    onClick={() => sendForgotPassword(profile.email)}
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
                    onClick={() => deleteUser()}
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
  );
};

export default TabPanelProfileParameters;
