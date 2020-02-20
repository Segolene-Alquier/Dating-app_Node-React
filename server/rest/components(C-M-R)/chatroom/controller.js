const Chat = require('./model');

const messages = new Chat();

async function getMatchsFromCurrentUser(request, response) {
  try {
    const id = request.decoded.userid;
    const call = await messages.getBy(['user1', 'user2'], id);
    response.status(200).json(call);
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

async function getMessagesFromMatchId(request, response) {
  try {
    const { id: matchId } = request.params;
    const userId = request.decoded.userid;
    if (await messages.userCanAccessMatch(matchId, userId)) {
      const call = await messages.getAll(matchId);
      messages.updateRead(matchId, userId);
      response.status(200).json(call);
    } else {
      response.status(200).json({
        success: false,
        message: "You don't have access to that chatroom, nice try!",
      });
    }
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

async function numberOfUnreadMessages(request, response) {
  const id = request.decoded.userid;
  try {
    const call = await messages.numberUnread(id);
    response.status(200).json(call);
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

module.exports.getMatchsFromCurrentUser = getMatchsFromCurrentUser;
module.exports.getMessagesFromMatchId = getMessagesFromMatchId;
module.exports.numberOfUnreadMessages = numberOfUnreadMessages;
