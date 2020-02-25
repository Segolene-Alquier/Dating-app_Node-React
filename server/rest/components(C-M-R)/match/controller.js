const Match = require('./model');

const matchs = new Match();

async function getMatchsFromCurrentUser(request, response) {
  try {
    const id = request.decoded.userid;
    const call = await matchs.getBy(['user1', 'user2'], id);
    response.status(200).json(call);
  } catch (err) {
    if (process.env.VERBOSE === 'true') console.log(err);
    response.status(206).send(err);
  }
}

async function getMatchById(request, response) {
  const id = parseInt(request.params.id, 10);
  try {
    const call = await matchs.getBy('id', id);
    response.status(200).json(call);
  } catch (err) {
    if (process.env.VERBOSE === 'true') console.log(err);
    response.status(206).send(err);
  }
}

module.exports.getMatchsFromCurrentUser = getMatchsFromCurrentUser;
module.exports.getMatchById = getMatchById;
