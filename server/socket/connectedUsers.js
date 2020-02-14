let connectedUsers = {};

const getConnectedUsers = () => {
  return connectedUsers;
};

const setConnectedUsers = value => {
  connectedUsers = value;
  return connectedUsers;
};

module.exports.getConnectedUsers = getConnectedUsers;
module.exports.setConnectedUsers = setConnectedUsers;
