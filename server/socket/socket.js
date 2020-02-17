const { newConnection } = require('./newConnection');
const { getConnectedUsers, setConnectedUsers } = require('./connectedUsers');
const disconnection = require('./disconnection');
const newMessage = require('./newMessage');
const joinChatroom = require('./joinChatroom');

const socketRouter = () => {
  io.on('connection', async socket => {
    newConnection(io, socket, getConnectedUsers());
    socket.on('joinchatroom', function(match) {
      joinChatroom(match, getConnectedUsers()[socket.id], socket);
    });
    socket.on('error', function(err) {
      // console.log(err.stack);
    });
    socket.on('disconnect', function() {
      disconnection(io, getConnectedUsers(), socket);
    });

    socket.on('chat message', function(msg, match) {
      console.log('new msg', msg, match, getConnectedUsers()[socket.id]);
      newMessage(msg, match, getConnectedUsers()[socket.id], socket, io);
    });
  });
};

module.exports = socketRouter;
