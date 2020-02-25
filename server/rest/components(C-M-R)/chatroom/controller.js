const Chat = require('./model');
const Match = require('../match/model');
const User = require('../user/model');

const messages = new Chat();
const match = new Match();
const user = new User();

async function getMatchsFromCurrentUser(request, response) {
  try {
    const id = request.decoded.userid;
    const call = await messages.getBy(['user1', 'user2'], id);
    response.status(200).json(call);
  } catch (err) {
    if (process.env.VERBOSE === 'true') console.log(err);
    response.status(206).send(err);
  }
}

async function getMessagesFromMatchId(request, response) {
  try {
    const { id: matchId } = request.params;
    const userId = request.decoded.userid;
    let otherUserId;
    if (await messages.userCanAccessMatch(matchId, userId)) {
      let call = await messages.getAll(matchId);
      const usersIds = await match.getUsersFromMatchId(matchId);
      if (usersIds[0] === userId) {
        [, otherUserId] = usersIds;
      }
      if (usersIds[1] === userId) {
        [otherUserId] = usersIds;
      }
      const otherUserInfo = await user.getByFiltered('id', otherUserId, [
        'profilePicture',
        'firstname',
        'username',
      ]);
      call = {
        messages: call,
        profilePicture: otherUserInfo[0].profilePicture,
        firstname: otherUserInfo[0].firstname,
        username: otherUserInfo[0].username,
      };
      if (process.env.VERBOSE === 'true') console.log('call', call);
      messages.updateRead(matchId, userId);
      response.status(200).json(call);
    } else {
      response.status(200).json({
        success: false,
        message: "You don't have access to that chatroom, nice try!",
      });
    }
  } catch (err) {
    if (process.env.VERBOSE === 'true') console.log(err);
    response.status(206).send(err);
  }
}

async function numberOfUnreadMessages(request, response) {
  const id = request.decoded.userid;
  try {
    const call = await messages.numberUnread(id);
    response.status(200).json(call);
  } catch (err) {
    if (process.env.VERBOSE === 'true') console.log(err);
    response.status(206).send(err);
  }
}

module.exports.getMatchsFromCurrentUser = getMatchsFromCurrentUser;
module.exports.getMessagesFromMatchId = getMessagesFromMatchId;
module.exports.numberOfUnreadMessages = numberOfUnreadMessages;
