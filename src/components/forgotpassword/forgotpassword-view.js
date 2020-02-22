import React from 'react';
import useForgotPasswordForm from './forgotpassword-container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

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

const ForgotPassword = () => {
  const forgotPassword = success => {
    if (success) {
      window.location = '/?message=forgotPassword_success';
    }
  };
  const { inputs, handleInputChange, handleSubmit } = useForgotPasswordForm(
    forgotPassword,
  );
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot your password?
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            htmlFor="email"
            type="email"
            name="email"
            onChange={handleInputChange}
            value={inputs.email}
            id="email"
            variant="outlined"
            required
            autoFocus
            label="your email address"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
          >
            Reset password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2">
                Login
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default ForgotPassword;
