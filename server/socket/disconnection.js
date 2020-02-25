const { setConnectedUsers } = require('./connectedUsers');

const disconnection = (io, connectedUsers, socket) => {
  if (process.env.VERBOSE === 'true')
    console.log('user disconnected', connectedUsers[socket.id]);
  socket.removeAllListeners('chat message');
  socket.removeAllListeners('joinchatroom');
  socket.removeAllListeners('disconnect');
  // io.removeAllListeners('connection');
  delete connectedUsers[socket.id];
  setConnectedUsers(connectedUsers);
};

module.exports = disconnection;
