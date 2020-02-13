const Chat = require('./../rest/components(C-M-R)/chatroom/model');
const Match = require('./../rest/components(C-M-R)/match/model');
const Block = require('./../rest/components(C-M-R)/block/model');

const chat = new Chat();
const match = new Match();
const block = new Block();

const newMessage = async (msg, matchId, userId, socket, io) => {
  if (await chat.canAccessChat(matchId)) {
    chat.create(matchId, userId, msg).then(response => {
      io.to(matchId).emit('chat message', response);
      match.updateLastMessage(matchId, response.id);
    });
  } else {
    socket.emit('redirect', 'cant_access_chat');
  }
  // console.log('message: ' + msg);
  // console.log('match: ' + matchId);
  // console.log('message socketid: ' + msg, userId);
  // console.log('rooms: ', socket.rooms);
};

module.exports = newMessage;
