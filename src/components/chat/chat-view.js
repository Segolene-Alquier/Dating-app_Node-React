import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import _ from 'lodash';
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
  emptyChat: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyChatTitle: {
    margin: theme.spacing(2),
  },
}));

const Chat = () => {
  const classes = useStyles();
  const { matchList } = ChatContainer();
  if (_.isEmpty(matchList)) {
    return (
      <Box className={classes.emptyChat}>
        <span role="img" aria-label="emoji" className={classes.emptyChatTitle}>
          You don't have matches yet. But don't worry, it's coming😌
        </span>{' '}
        <img src="https://media.giphy.com/media/Az1CJ2MEjmsp2/giphy.gif" alt="lonely ghost town gif"/>
      </Box>
    );
  }
  return (
    <List className={classes.root}>
      {_.map(matchList, matchedProfile => {
        const redirectLink = `/chatroom/${matchedProfile.matchid}`;
        return (
          <Fragment key={matchedProfile.matchid}>
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
          </Fragment>
        );
      })}
    </List>
  );
};

export default Chat;
