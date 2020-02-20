const Chat = require('./../rest/components(C-M-R)/chatroom/model');
const Match = require('./../rest/components(C-M-R)/match/model');
const Block = require('./../rest/components(C-M-R)/block/model');
const newNotification = require('./newNotification');

const chat = new Chat();
const match = new Match();
const block = new Block();

const newMessage = async (msg, matchId, userId, socket, io) => {
  if (await chat.canAccessChat(matchId)) {
    chat.create(matchId, userId, msg).then(async response => {
      io.to(matchId).emit('chat message', response);
      match.updateLastMessage(matchId, response.id);
      const matchUsers = await match.getUsersFromMatchId(matchId);
      let recipient;
      if (matchUsers[0] === userId) {
        [, recipient] = matchUsers;
      } else {
        [recipient] = matchUsers;
      }
      newNotification(recipient, userId, 'message');
    });
  } else {
    socket.emit('redirect', 'cant_access_chat');
  }
};

module.exports = newMessage;
