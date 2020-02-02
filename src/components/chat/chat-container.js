import axios from 'axios';
import { useState, useContext } from 'react';
import _ from 'lodash';
import { AuthContext } from '../app/AuthContext';

const ChatContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const { authContext } = useContext(AuthContext);
  const { userData, token } = authContext;
  const [matchList, setMatchList] = useState({});

  const fetchCurrentUserMatches = () => {
    axios
      .get('http://localhost:3001/matchs/', {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(response => {
		console.log('response', response.data);
		setMatchList(response.data);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (_.isEmpty(matchList) && loaded === false) {
    // setMatchList();
    const response = fetchCurrentUserMatches();
    console.log('match list', matchList);
    // Promise.all([token, fetchCurrentUserMatches()]).then(values => {
    // console.log(values);
    // setVisitedProfile(values[1]);
    // setVisitorProfile(values[0].data);
    setLoaded(true);
    //   });
  }
  return { matchList };
};

export default ChatContainer;
