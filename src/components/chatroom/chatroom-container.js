import axios from 'axios';
import { AuthContext } from '../app/AuthContext';
import { useState, useContext } from 'react';

const ChatroomContainer = matchId => {
  const [loaded, setLoaded] = useState(false);
  const { authContext } = useContext(AuthContext);
  const { userData, token } = authContext;
  const { chatroomInfo, setChatroomInfo } = useState({});

  const fetchMessagesFromConversation = () => {
	  console.log("axios id", matchId);
    axios
      .get(`http://localhost:3001/chat/${matchId}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(response => {
        console.log('ici');

        console.log('response', response.data);

        // setChatroomInfo(response.data);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (loaded === false) {
    fetchMessagesFromConversation();
    setLoaded(true);
  }
  return { chatroomInfo };
};

export default ChatroomContainer;
