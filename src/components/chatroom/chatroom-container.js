import axios from 'axios';
import { AuthContext } from '../app/AuthContext';
import { useState, useContext } from 'react';
import _ from 'lodash';

const ChatroomContainer = matchId => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { authContext } = useContext(AuthContext);
  const { userData, token } = authContext;
  const [chatroomInfo, setChatroomInfo] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchMessagesFromConversation = () => {
    axios
      .get(`http://localhost:3001/chat/${matchId}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(response => {
        setChatroomInfo(response.data);
        userData.then(data => {
          setCurrentUser(data.data.id);
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
  return { chatroomInfo, setChatroomInfo, loaded, currentUser };
};

export default ChatroomContainer;
