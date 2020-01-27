import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import io from 'socket.io-client';
let socket = io(`http://localhost:3002`);

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  socket.on('chat message', msg => {
    console.log(msg);
    setMessageList(messageList.concat({ sendername: 'yann', msg: msg }));
    console.log(messageList);
  });

  const handleMessage = event => {
		setMessage(event.target.value);

  };

  const sendMessage = () => {
    socket.emit('chat message', message);
		setMessage('');
		setMessageList(messageList.concat({ sendername: 'yann', msg: message }));
  };

  return (
    <>
      <TextField
        onChange={handleMessage}
        value={message}
        type="text"
        name="message"
      />
      <Button onClick={sendMessage} variant="contained">
        Send
      </Button>
    </>
  );
};

export default Chat;
