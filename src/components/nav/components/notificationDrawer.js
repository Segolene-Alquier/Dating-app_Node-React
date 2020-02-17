import React, { useContext, useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  Divider,
  ListItemText,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';

const NotificationDrawer = ({ classes, toggleDrawer, notifications }) => {
  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {notifications.map(notification => (
          <ListItem button key={notification.id}>
            <ListItemText
              primary={notification.message}
              secondary={notification.sender}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default NotificationDrawer;
