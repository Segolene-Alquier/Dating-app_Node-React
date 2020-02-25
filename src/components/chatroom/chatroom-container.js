import axios from 'axios';
import { useState, useContext } from 'react';
import _ from 'lodash';
import { AuthContext } from '../app/AuthContext';

const ChatroomContainer = matchId => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { authContext, socketContext } = useContext(AuthContext);
  const { userData, token } = authContext;
  const [chatroomInfo, setChatroomInfo] = useState({});
  const [chatroomMessages, setChatroomMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState('');

  socketContext.socket.on('chat message', msg => {
    setChatroomMessages(chatroomMessages.concat(msg));
  });

  socketContext.socket.on('redirect', msg => {
    window.location = `/?message=${msg}`;
  });

  const handleMessage = event => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    socketContext.socket.emit('chat message', message, matchId);
    setMessage('');
  };

  const fetchMessagesFromConversation = () => {
    axios
      .get(`http://${process.env.REACT_APP_PUBLIC_API_URL}/chat/${matchId}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(response => {
        if (response.data.success === false) {
          window.location = '/?message=access_denied';
          return;
        }
        setChatroomInfo({
          profilePicture: response.data.profilePicture,
          firstname: response.data.firstname,
          username: response.data.username,
        });
        setChatroomMessages(response.data.messages);
        userData.then(data => {
          setCurrentUser(data.data.id);
          socketContext.socket.emit('joinchatroom', matchId);
        });
        setLoaded(true);
        setLoading(false);
      })
      .catch(error => {
      if (process.env.REACT_APP_VERBOSE === 'true') console.log(error);
      });
  };

  if (_.isEmpty(chatroomInfo) && loaded === false && loading === false) {
    setLoading(true);
    fetchMessagesFromConversation();
  }
  return {
    chatroomInfo,
    chatroomMessages,
    setChatroomInfo,
    setChatroomMessages,
    loaded,
    currentUser,
    handleMessage,
    sendMessage,
    message,
  };
};

export default ChatroomContainer;
