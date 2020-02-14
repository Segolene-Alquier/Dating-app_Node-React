import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  Avatar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../app/AuthContext';
import { logout } from '../auth';

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
  const { authContext, socketContext } = useContext(AuthContext);
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
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Matcha
        </Typography>
        {isLoggedIn ? (
          <>
            <Button
              color="inherit"
              href="/suggestions"
              startIcon={<FavoriteIcon />}
            >
              Suggestions
            </Button>
            <Button
              color="inherit"
              href="/visits"
              startIcon={<VisibilityIcon />}
            >
              My visits
            </Button>
            <Button color="inherit" href="/search" startIcon={<SearchIcon />}>
              Find users
            </Button>
            <IconButton color="inherit" href="/chat">
              <ChatBubbleIcon />
            </IconButton>
            <IconButton color="inherit" href="">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" href="profile">
              <AccountCircleIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={e => {
                logout(e, setIsLoggedIn);
              }}
            >
              <ExitToAppIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Button color="inherit" href="/signup">
              Signup
            </Button>{' '}
            <Button color="inherit" href="/login">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
