const { setConnectedUsers } = require('./connectedUsers');

const disconnection = (io, connectedUsers, socket) => {
  console.log('user disconnected', connectedUsers[socket.id]);
  delete connectedUsers[socket.id];
  setConnectedUsers(connectedUsers);
};

module.exports = disconnection;
