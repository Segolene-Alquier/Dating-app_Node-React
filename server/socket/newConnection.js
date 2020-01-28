const { checkTokenSocket } = require('./../rest/middleware/jwt');
const newConnection = async (io, connectedUsers, socket) => {
  console.log(
    `a user connected with socket.id ${socket.id}, handshake query`,
    socket.handshake.query,
  );
  console.log(checkTokenSocket);
  const userConnected = await checkTokenSocket(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIwLCJpYXQiOjE1ODAyMTcyNzQsImV4cCI6MTU4MDMwMzY3NH0.wBPeYUpS7OlN4_RI6oyQa4zmBU3gaPg1UVXscb1MTZ8',
  );
  if (userConnected) {
    connectedUsers[socket.id] = 20;
    console.log('connectedUsers', connectedUsers);
    } else {
    socket.disconnect();
  }
  // .then(data => console.log('checktoken', data))
  // .catch(err => {
  //   console.log(err);
  // });
};

module.exports = newConnection;
