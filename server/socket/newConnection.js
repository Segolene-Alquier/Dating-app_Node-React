const { checkTokenSocket } = require('./../rest/middleware/jwt');

const newConnection = async (io, connectedUsers, socket) => {
  console.log(
    `a user connected with socket.id ${socket.id}, handshake query`,
    socket.handshake.query,
  );
  console.log(checkTokenSocket);
  const userConnected = await checkTokenSocket(socket.handshake.query.token);
  if (userConnected) {
    console.log('userConnected.userid', userConnected);
    connectedUsers[socket.id] = userConnected.userid;
    console.log('connectedUsers', connectedUsers);
  } else {
    socket.disconnect();
  }
};

module.exports = newConnection;
