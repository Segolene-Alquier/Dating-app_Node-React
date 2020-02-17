const Notification = require('./model');
const Match = require('./../match/model');
const Block = require('./../block/model');
const User = require('./../user/model');
const Chat = require('./../chatroom/model');
// const { sendNotificationEmail } = require('../../../mailer/sendNotificationEmail');

const notifications = new Notification();
const block = new Block();
const matchs = new Match();
const user = new User();
const chat = new Chat();

async function getNotificationsFromCurrentUser(request, response) {
  const id = request.decoded.userid;
  try {
    const call = await notifications.getBy('recipient', id);
    notifications.updateRead(id);
    response.status(200).json(call);
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

async function numberOfUnreadNotifications(request, response) {
  const id = request.decoded.userid;
  try {
    const call = await notifications.numberUnread(id);
    response.status(200).json(call);
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

module.exports.getNotificationsFromCurrentUser = getNotificationsFromCurrentUser;
module.exports.numberOfUnreadNotifications = numberOfUnreadNotifications;
