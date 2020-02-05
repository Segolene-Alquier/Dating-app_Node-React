import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import ChatroomContainer from './chatroom-container';

const useStyles = makeStyles(theme => ({
  chatWrapper: { position: 'relative' },
  chatContent: {
    width: '100%',
    maxWidth: '1140px',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    height: '80vh',
    overflowY: 'scroll',
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
    maxWidth: '1140px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'fixed',
    bottom: '0',
    backgroundColor: 'white',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: '#f4f4f4',
  },
  textField: {
    backgroundColor: '#ffffff',
  },
}));

const ChatRoom = ({}) => {
  // message = string
  // sender = current user or other
  // other picture
  const classes = useStyles();
  const { matchId } = useParams();
  const { chatroomInfo } = ChatroomContainer(matchId);

  console.log('matchId', matchId);

  return (
    <>
      <Box className={classes.chatWrapper}>
        <Box className={classes.chatContent}>
          <Box className={classes.boxMessageOther}>
            <Avatar alt="Remy Sharp" src="https://placekitten.com/g/200/300" />
            <div className={classes.textBubbleOther}>
              <span>Lorem ipsum dolor sit amet.</span>
            </div>
          </Box>
          <Box className={classes.boxMessageOther}>
            <Avatar alt="Remy Sharp" src="https://placekitten.com/g/200/300" />
            <div className={classes.textBubbleOther}>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                fermentum leo eget leo iaculis, elementum.
              </span>
            </div>
          </Box>
          <Box className={classes.boxMessageMe}>
            <div className={classes.textBubbleMe}>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                fermentum leo eget leo iaculis, elementum.
              </span>
            </div>
          </Box>
        </Box>
      </Box>
      <Box className={classes.messageInput}>
        <Grid container spacing={2}>
          <Grid item sm={10} xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              className={classes.textField}
            />
          </Grid>
          <Grid item sm={2} xs={12}>
            <Button variant="contained" color="secondary">
              Send message
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ChatRoom;
