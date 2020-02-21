import axios from 'axios';
import { AuthContext } from '../app/AuthContext';
import { useState, useContext } from 'react';
import _ from 'lodash';

const ChatroomContainer = matchId => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { authContext, socketContext } = useContext(AuthContext);
  const { userData, token } = authContext;
  const [chatroomInfo, setChatroomInfo] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState('');

  socketContext.socket.on('chat message', msg => {
    setChatroomInfo(chatroomInfo.concat(msg));
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

  // const fetchInfoFromOther = () => {
  //   axios
  //     .get(`http://localhost:3001/chat/${matchId}`, {
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //         'x-access-token': token,
  //       },
  //     })
  //     .then(response => {
  //       if (response.data.success === false) {
  //         window.location = '/?message=access_denied';
  //         return;
  //       }
  //       setChatroomInfo(response.data);
  //       userData.then(data => {
  //         setCurrentUser(data.data.id);
  //         socketContext.socket.emit('joinchatroom', matchId);
  //       });
  //       setLoaded(true);
  //       setLoading(false);
  //       return response.data;
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  const fetchMessagesFromConversation = () => {
    axios
      .get(`http://localhost:3001/chat/${matchId}`, {
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
        setChatroomInfo(response.data);
        userData.then(data => {
          setCurrentUser(data.data.id);
          socketContext.socket.emit('joinchatroom', matchId);
        });
        setLoaded(true);
        setLoading(false);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (_.isEmpty(chatroomInfo) && loaded === false && loading === false) {
    setLoading(true);
    fetchMessagesFromConversation();
  }
  return {
    chatroomInfo,
    setChatroomInfo,
    loaded,
    currentUser,
    handleMessage,
    sendMessage,
    message,
  };
};

export default ChatroomContainer;
