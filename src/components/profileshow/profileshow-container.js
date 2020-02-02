import axios from 'axios';
import { useState, useContext } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { AuthContext } from '../app/AuthContext';

const ProfileShowContainer = visitedUsername => {
  const [visitedProfile, setVisitedProfile] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { authContext } = useContext(AuthContext);
  const { token } = authContext;

  const handleBlock = (blockedId, blocked, setBlocked) => {
    axios
      .post(
        `http://localhost:3001/block/block-unblock/${blockedId}`,
        {},
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-access-token': token,
          },
        },
      )
      .then(result => {
        console.log('result deleted:', result.data.deleted);
        console.log('result created:', result.data.created);
        if (result.data.deleted === true) {
          setBlocked(false);
          toast.success('You just unblocked this user');
        }
        if (result.data.created === true) {
          setBlocked(true);
          toast.success('You just blocked this user');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleReport = (reportedId, reported, setReported) => {
    axios
      .post(
        `http://localhost:3001/report/${reportedId}`,
        {},
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'x-access-token': token,
          },
        },
      )
      .then(result => {
        if (result.data.success) {
          setReported(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleLike = (likedId, setLiked) => {
    console.log('liked user ', likedId);
    axios
      .get(`http://localhost:3001/likes/like-unlike/${likedId}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(result => {
        if (result.data.deleted === true) {
          setLiked(false);
          toast.success('You just unliked this user');
        }
        if (result.data.created === true) {
          setLiked(true);
          toast.success('You just liked this user');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchVisitedProfile = () =>
    axios
      .get(`http://localhost:3001/users/profile/${visitedUsername}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-access-token': token,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });

  if (_.isEmpty(visitedProfile) && loading === false) {
    setLoading(true)
    fetchVisitedProfile().then(data => {
      if (data.founded === true) {
        setVisitedProfile(data);
        setLoaded(true);
        setLoading(false);
      } else {
        if (data.success === false) {
          window.location = '/?message=user_not_found';
        } else if (data.authorized === false) {
          window.location = '/profile?message=profile_not_completed';
        } else if (data.blocked === true) {
          window.location = '/?message=user_blocked_you';
        }
      }
    });
  }

  return { visitedProfile, loaded, handleBlock, handleReport, handleLike };
};

export default ProfileShowContainer;
