const disconnection = (io, connectedUsers, socket) => {
  console.log('user disconnected', connectedUsers[socket.id]);
  delete connectedUsers[socket.id];
};

module.exports = disconnection;
