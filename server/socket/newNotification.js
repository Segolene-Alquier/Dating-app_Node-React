const { getConnectedUsers, setConnectedUsers } = require('./connectedUsers');
const _ = require('lodash');
const Notification = require('./../rest/components(C-M-R)/notification/model');
const notification = new Notification();

const newNotification = (recipient, sender, type) => {
  const connectedUsers = getConnectedUsers();
  const recipientSocketIds = _.keys(
    _.pickBy(connectedUsers, user => {
      return user === recipient;
    }),
  );
  if (process.env.VERBOSE === 'true')
    console.log('recipientSocketIds', recipientSocketIds);
  notification.create(recipient, sender, type);
  recipientSocketIds.forEach(socketId => {
    io.to(socketId).emit('new notification', sender, type);
  });
};

module.exports = newNotification;
