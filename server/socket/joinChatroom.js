const Chat = require('./../rest/components(C-M-R)/chatroom/model');
const chat = new Chat();

const joinChatroom = async (matchId, userId, socket) => {
  if (await chat.userCanAccessMatch(matchId, userId)) {
    socket.join(matchId);
  } else {
    if (process.env.VERBOSE === 'true')
      console.log(
        `The user ${userId} cannot access this chatroom because it doesn't belong to match ${matchId}`,
      );
  }
};

module.exports = joinChatroom;
