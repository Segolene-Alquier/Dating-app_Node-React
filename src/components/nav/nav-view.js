import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Fragment, useContext, useState } from 'react';
import { AuthContext } from './../app/AuthContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Nav = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  authContext.userData.then(data => {
    if (data) {
      setIsLoggedIn(data.success);
    } else {
      setIsLoggedIn(false);
    }
  });
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Matcha
        </Typography>
        {isLoggedIn ? (
          <Button color="inherit">Logout</Button>
        ) : (
          <Fragment>
            <Button color="inherit">Signup</Button> <Button color="inherit">Login</Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
