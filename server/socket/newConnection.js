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
  console.log(
    `a user connected with socket.id ${socket.id}, handshake query`,
    socket.handshake.query,
  );
  console.log(checkTokenSocket);
  const userConnected = await checkTokenSocket(socket.handshake.query.token);
  if (userConnected) {
    const connectedUsers = getConnectedUsers();
    connectedUsers[socket.id] = userConnected.userid;
    console.log(getConnectedUsers());
    setConnectedUsers(connectedUsers);
  } else {
    socket.disconnect();
  }
};

module.exports.newConnection = newConnection;
module.exports.connectedUsersId = connectedUsersId;
module.exports.isConnected = isConnected;
