const Like = require('./model');
const Match = require('./../match/model');

const likes = new Like();
const matchs = new Match();

async function getLikesFromCurrentUser(request, response) {
  const id = request.decoded.userid;
  try {
    const call = await likes.getBy('likingUser', id);
    response.status(200).json(call);
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

async function likeUnlikeUserId(request, response) {
  const likingUser = request.decoded.userid;
  const likedUser = parseInt(request.params.id, 10);
  if (likedUser === likingUser) {
    return response
      .status(200)
      .json({ success: false, error: 'You can not block yourself!' });
  }
  try {
    const alreadyLiked = await likes.exists(likingUser, likedUser);
    let query;
    if (alreadyLiked) {
      query = await likes.delete(likingUser, likedUser);
      if (query.unmatch) {
        matchs.delete(likingUser, likedUser);
      }
    } else {
      query = await likes.create(likingUser, likedUser);
      if (query.match) {
        const matchQuery = await matchs.create(likingUser, likedUser);
        query.matchId = matchQuery.id;
      }
    }
    response.status(200).json(query);
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

module.exports.getLikesFromCurrentUser = getLikesFromCurrentUser;
module.exports.likeUnlikeUserId = likeUnlikeUserId;
