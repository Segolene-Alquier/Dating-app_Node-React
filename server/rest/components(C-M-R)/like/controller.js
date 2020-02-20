const Like = require('./model');
const Match = require('./../match/model');
const Block = require('./../block/model');
const User = require('./../user/model');
const Chat = require('./../chatroom/model');
const _ = require('lodash');

const { sendLikeEmail } = require('../../../mailer/sendLikeEmail');
const { isConnected } = require('./../../../socket/newConnection');
const newNotification = require('../../../socket/newNotification');

const likes = new Like();
const block = new Block();
const matchs = new Match();
const user = new User();
const chat = new Chat();

async function getLikesFromCurrentUser(request, response) {
  const id = request.decoded.userid;
  try {
    let call = await likes.getBy('likedUser', id);
    call = _.map(call, like => {
      return { ...like, connected: isConnected(like.likingUser) };
    });
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
      .json({ success: false, error: 'You can not like yourself!' });
  }
  if (await block.exists(likedUser, likingUser)) {
    return response.status(200).json({
      success: false,
      blocked: true,
      message: 'You have been blocked by this user!',
    });
  }
  try {
    const alreadyLiked = await likes.exists(likingUser, likedUser);
    let query;
    if (alreadyLiked) {
      query = await likes.delete(likingUser, likedUser);
      if (query.unmatch) {
        const matchId = await matchs.getMatchId(likingUser, likedUser);
        newNotification(likedUser, likingUser, 'unmatch');
        await chat.delete(matchId);
        matchs.delete(likingUser, likedUser);
      }
    } else {
      query = await likes.create(likingUser, likedUser);
      if (query.match) {
        const matchQuery = await matchs.create(likingUser, likedUser);
        newNotification(likedUser, likingUser, 'match');
        query.matchId = matchQuery.id;
      } else {
        newNotification(likedUser, likingUser, 'like');
        sendLikeEmail(likedUser, likingUser);
      }
    }
    user.updatePopularityRate(likedUser);
    response.status(200).json(query);
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

module.exports.getLikesFromCurrentUser = getLikesFromCurrentUser;
module.exports.likeUnlikeUserId = likeUnlikeUserId;
