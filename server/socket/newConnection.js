const { checkTokenSocket } = require('./../rest/middleware/jwt');
const newConnection = (io, connectedUsers, socket) => {
  console.log(
    `a user connected with socket.id ${socket.id}, handshake query`,
    socket.handshake.query,
  );
  // console.log(checkTokenSocket);
  // console.log(
  //   'checktoken',
  //   await checkTokenSocket(
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIwLCJpYXQiOjE1ODAyMTcyNzQsImV4cCI6MTU4MDMwMzY3NH0.wBPeYUpS7OlN4_RI6oyQa4zmBU3gaPg1UVXscb1MTZ8',
  //   ),
  // );
};

module.exports = newConnection;
