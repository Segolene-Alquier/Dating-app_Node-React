import React from 'react';
import { useParams } from 'react-router-dom';

const ChatRoom = ({}) => {
  let { id } = useParams();
  return <div>chatroom {id}</div>;
};

export default ChatRoom;
