import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import usePasswordForm from './resetforgotpassword-container';

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
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ResetForgotPassword = ({ computedMatch }) => {
  const classes = useStyles();
  const callback = success => {
    if (success) {
      window.location = '/?message=reset_password_success';
    }
  };
  const { token } = computedMatch.params;
  const { inputs, handleInputChange, handleSubmit } = usePasswordForm(
    callback,
    token,
  );
  const [validToken, setValidToken] = useState(false);
  if (!validToken) {
    axios
      .get(
        `http://${process.env.REACT_APP_PUBLIC_API_URL}/validation/forgotpassword/${token}`,
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .then(data => {
        if (data.data.success) {
          setValidToken(true);
        } else {
          window.location = '/?message=user_not_validated';
        }
      });
  }
  if (validToken === true) {
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change your password
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              htmlFor="password1"
              type="password"
              name="password1"
              onChange={handleInputChange}
              value={inputs.password1}
              id="password1"
              variant="outlined"
              required
              autoFocus
              label="Enter new password"
            />
            <TextField
              fullWidth
              margin="normal"
              htmlFor="password2"
              type="password"
              name="password2"
              onChange={handleInputChange}
              value={inputs.password2}
              variant="outlined"
              id="password2"
              required
              autoFocus
              label="Confirm new password"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submit}
            >
              Validate new password
            </Button>
          </form>
        </div>
      </Container>
    );
  }
  return <h1>Chargement en cours</h1>;
};
ResetForgotPassword.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  computedMatch: PropTypes.object.isRequired,
};

export default ResetForgotPassword;
