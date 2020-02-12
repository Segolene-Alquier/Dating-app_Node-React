const Chat = require('./model');

const matchs = new Chat();

async function getMatchsFromCurrentUser(request, response) {
  try {
    const id = request.decoded.userid;
    const call = await matchs.getBy(['user1', 'user2'], id);
    response.status(200).json(call);
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

async function getMessagesFromMatchId(request, response) {
  try {
    const { id } = request.params;
    const userId = request.decoded.userid;
    if (await matchs.userCanAccessMatch(id, userId)) {
      const call = await matchs.getAll(id);
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

module.exports.getMatchsFromCurrentUser = getMatchsFromCurrentUser;
module.exports.getMessagesFromMatchId = getMessagesFromMatchId;
