import React, { useContext, useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  SwipeableDrawer,
  Badge,
  Link,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import { AuthContext } from '../app/AuthContext';
import { logout } from '../auth';
import NotificationDrawer from './components/notificationDrawer';
// import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  matchaLogo: {
    flexGrow: 1,
  },
  navIcon: {
    color: 'white',
    '&:focus': {
      textDecoration: 'none',
    },
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.secondary.main,
    },
    '&:visited': {
      textDecoration: 'none',
    },
    '&:link': {
      textDecoration: 'none',
    },
    '&:active': {
      textDecoration: 'none',
    },
  },
}));

const Nav = () => {
  const classes = useStyles();
  const { authContext, socketContext } = useContext(AuthContext);
  const { token } = authContext;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
  const [notifMenu, setNotifMenu] = React.useState({
    right: false,
  });

  // const debounced = (sender, type) =>
  //   _.throttle(toast.info(sender + type), 250);
  const fetchTotalNotifications = async () => {
    await axios
      .get(`http://localhost:3001/notification/total`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(result => {
        setTotalNotifications(parseInt(result.data, 10));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchTotalMessages = async () => {
    await axios
      .get(`http://localhost:3001/chat/total`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(result => {
        setTotalMessages(parseInt(result.data, 10));
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchTotalNotifications();
    fetchTotalMessages();
  }, []);

  const fetchNotifications = async () => {
    await axios
      .get(`http://localhost:3001/notification`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(result => {
        setNotifications(result.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const toggleDrawer = open => async event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    if (open) {
      await fetchNotifications();
      setTotalNotifications(0);
    }
    setNotifMenu({ ...notifMenu, right: open });
  };

  socketContext.socket.on('new notification', (sender, type) => {
    console.log(sender, type);
    // debounced(sender, type);
  });

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
        <Typography variant="h6" className={classes.matchaLogo}>
          <Link
            href="/"
            style={{ textDecoration: 'none' }}
            className={classes.navIcon}
          >
            Matcha
          </Link>
        </Typography>
        {isLoggedIn ? (
          <>
            <IconButton color="inherit" href="/chat">
              <Badge color="secondary" badgeContent={totalMessages} showZero>
                <ChatBubbleIcon className={classes.navIcon} />
              </Badge>
            </IconButton>
            <IconButton onClick={toggleDrawer(true)} color="inherit">
              <Badge
                color="secondary"
                badgeContent={totalNotifications}
                showZero
              >
                <NotificationsIcon className={classes.navIcon} />
              </Badge>
            </IconButton>

            <IconButton color="inherit" href="profile">
              <AccountCircleIcon className={classes.navIcon} />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={e => {
                logout(e, setIsLoggedIn);
              }}
            >
              <ExitToAppIcon className={classes.navIcon} />
            </IconButton>
            <SwipeableDrawer
              anchor="right"
              open={notifMenu.right}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              <NotificationDrawer
                classes={classes}
                toggleDrawer={toggleDrawer}
                notifications={notifications}
              />
            </SwipeableDrawer>
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
