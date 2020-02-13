const Chat = require('./../rest/components(C-M-R)/chatroom/model');
const Match = require('./../rest/components(C-M-R)/match/model');

const chat = new Chat();
const match = new Match();

const newMessage = (msg, matchId, userId, socket, io) => {
  chat.create(matchId, userId, msg).then(response => {
    io.to(matchId).emit('chat message', response);
    match.updateLastMessage(matchId, response.id);
  });
  console.log('message: ' + msg);
  console.log('match: ' + matchId);
  console.log('message socketid: ' + msg, userId);
  console.log('rooms: ', socket.rooms);
};

module.exports = newMessage;
