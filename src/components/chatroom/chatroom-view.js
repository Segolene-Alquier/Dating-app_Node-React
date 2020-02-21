import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import ChatroomContainer from './chatroom-container';

const useStyles = makeStyles(theme => ({
  chatWrapper: { position: 'relative' },
  progress: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatInfoWrapper: {
    padding: theme.spacing(2),
    backgroundColor: '#f4f4f4',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  chatInfoAvatarWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
  chatContent: {
    width: '100%',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    height: '80vh',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  boxMessageOther: {
    display: 'flex',
    flexDirection: 'row',
  },
  boxMessageMe: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textBubbleOther: {
    backgroundColor: '#f4f4f4',
    borderRadius: '1.3em',
    padding: '10px 20px',
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    maxWidth: '600px',
  },
  textBubbleMe: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '1.3em',
    padding: '10px 20px',
    maxWidth: '600px',
    color: 'white',
    marginBottom: theme.spacing(1),
  },
  messageInput: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'fixed',
    bottom: '0',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: '#f4f4f4',
  },
  textField: {
    backgroundColor: '#ffffff',
  },
}));

const ChatRoom = () => {
  const classes = useStyles();
  let { matchId } = useParams();
  matchId = parseInt(matchId, 10);
  const {
    chatroomInfo,
    chatroomMessages,
    loaded,
    currentUser,
    handleMessage,
    sendMessage,
    message,
  } = ChatroomContainer(matchId);
  let scrolled = false;
  const element = document.getElementById('chat');
  // make sure the chat scrolls down to last message
  const updateScroll = () => {
    if (!scrolled && element) {
      element.scrollTop = element.scrollHeight;
    }
  };
  // doesn't prevent to scroll up when the user started to scroll
  if (element) {
    element.addEventListener('scroll', () => {
      scrolled = true;
    });
  }
  updateScroll();

  if (loaded === false) {
    return (
      <div className={classes.progress}>
        <CircularProgress color="secondary" />
      </div>
    );
  }
  const profileLink = `/profile/${chatroomInfo.username}`;
  return (
    <>
      <Box className={classes.chatWrapper}>
        <Box className={classes.chatInfoWrapper}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            href="/chat"
            startIcon={<ArrowBackIosIcon />}
          >
            All
          </Button>
          <Box>
            <Link href={profileLink} className={classes.chatInfoAvatarWrapper}>
              <Avatar
                alt="Avatar"
                src={chatroomInfo.profilePicture}
                className={classes.avatar}
              />
              <Typography variant="h5">{chatroomInfo.firstname}</Typography>
            </Link>
          </Box>
          <Box></Box>
        </Box>
        <Box className={classes.chatContent} id="chat">
          {_.map(chatroomMessages, message => {
            if (currentUser !== message.author) {
              return (
                <Box key={message.id} className={classes.boxMessageOther}>
                  <Avatar alt="Avatar" src={message.profilePicture} />
                  <div className={classes.textBubbleOther}>
                    <span>{message.content}</span>
                  </div>
                </Box>
              );
            }
            return (
              <Box key={message.id} className={classes.boxMessageMe}>
                <div className={classes.textBubbleMe}>
                  <span>{message.content}</span>
                </div>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box className={classes.messageInput}>
        <Grid container spacing={2}>
          <Grid item sm={10} xs={12}>
            <TextField
              onChange={handleMessage}
              value={message}
              fullWidth
              type="text"
              name="message"
              variant="outlined"
              className={classes.textField}
            />
          </Grid>
          <Grid item sm={2} xs={12}>
            <Button onClick={sendMessage} variant="contained" color="secondary">
              Send message
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ChatRoom;
