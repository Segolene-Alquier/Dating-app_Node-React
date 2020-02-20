import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import _ from 'lodash';
// import Iframe from 'react-iframe';
import ChatContainer from './chat-container';

const useStyles = makeStyles(theme => ({
  buttonChatroom: {
    width: '100%',
    height: '100%',
    textTransform: 'none',
    padding: '0',
  },
  notReadMessage: {
    backgroundColor: '#edf2fa',
  },
}));

const Chat = () => {
  const classes = useStyles();
  const { matchList } = ChatContainer();

  return (
    <List className={classes.root}>
      {_.map(matchList, matchedProfile => {
        let redirectLink = `/chatroom/${matchedProfile.matchid}`;
        return (
          <>
            <Button
              className={classes.buttonChatroom}
              variant="text"
              href={redirectLink}
            >
              <ListItem
                alignItems="flex-start"
                className={
                  matchedProfile.read === false ? classes.notReadMessage : null
                }
              >
                <ListItemAvatar>
                  <Avatar alt="avatar" src={matchedProfile.profilePicture} />
                </ListItemAvatar>
                <ListItemText
                  primary={matchedProfile.firstname}
                  secondary={matchedProfile.content}
                />
              </ListItem>
            </Button>
            <Divider variant="inset" component="li" />
          </>
        );
      })}
    </List>
  );
};

export default Chat;
