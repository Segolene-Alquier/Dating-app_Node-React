const { checkTokenSocket } = require('./../rest/middleware/jwt');
const _ = require('lodash');
const { getConnectedUsers, setConnectedUsers } = require('./connectedUsers');

const connectedUsersId = () => {
  const connectedUsers = getConnectedUsers();
  return _.uniq(_.values(connectedUsers));
};

const isConnected = id => {
  return _.includes(connectedUsersId(), id);
};

const newConnection = async (io, socket) => {
  const userConnected = await checkTokenSocket(socket.handshake.query.token);
  if (userConnected) {
    const connectedUsers = getConnectedUsers();
    connectedUsers[socket.id] = userConnected.userid;
    setConnectedUsers(connectedUsers);
  }
};

module.exports.newConnection = newConnection;
module.exports.connectedUsersId = connectedUsersId;
module.exports.isConnected = isConnected;
