import axios from 'axios';
import { useState, useContext } from 'react';
import _ from 'lodash';
import { AuthContext } from '../app/AuthContext';

const ChatContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const { authContext } = useContext(AuthContext);
  const { userData, token } = authContext;
  const [matchList, setMatchList] = useState({});
  const [matchList2, setMatchList2] = useState({});

  const getMatchProfiles = list => {
    let promises = [];
    let array = [];
    console.log('list', list);
    Promise.all([userData]).then(values => {
      const currentUserId = values[0].data.id;
      console.log(currentUserId);
    });
    for (let i = 0; i < _.size(list); i++) {
      console.log('matchList[i].user1', list[i]);

      // promises.push(
      //   axios
      // .get('http://localhost:3001/users/' + matchList[i].user1, {
      //   headers: {
      //     'Content-type': 'application/json; charset=UTF-8',
      //     'x-access-token': token,
      //   },
      // })
      // .then(response => {
      //   console.log('response', response.data);
      //   setMatchList(response.data);
      //   return response.data;
      // })
      // .catch(error => {
      //   console.log(error);
      // });
      // );
    }
  };

  const fetchCurrentUserMatches = () => {
    axios
      .get('http://localhost:3001/matchs/', {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(response => {
        // console.log('response', response.data);
        // setMatchList(response.data);
        getMatchProfiles(response.data);

        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (_.isEmpty(matchList) && loaded === false) {
    const response = fetchCurrentUserMatches();
    console.log('match list', matchList);
    // Promise.all([fetchCurrentUserMatches()]).then(values => {
    //   console.log(values);
    // setLoaded(true);

    // });
    // Promise.all([token, fetchCurrentUserMatches()]).then(values => {
    // console.log(values);
    // setVisitedProfile(values[1]);
    // setVisitorProfile(values[0].data);
  }
  return { matchList, matchList2 };
};

export default ChatContainer;
