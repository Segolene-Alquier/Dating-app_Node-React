import axios from 'axios';
import { useState, useContext } from 'react';
import _ from 'lodash';
import { AuthContext } from '../app/AuthContext';

const ChatContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const { authContext } = useContext(AuthContext);
  const { token } = authContext;
  const [matchList, setMatchList] = useState({});

  const fetchCurrentUserMatches = () => {
    axios
      .get(`http://${process.env.REACT_APP_PUBLIC_API_URL}/chat/`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(response => {
        setMatchList(response.data);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (_.isEmpty(matchList) && loaded === false) {
    fetchCurrentUserMatches();
    setLoaded(true);
  }
  return { matchList };
};

export default ChatContainer;
