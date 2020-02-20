const { getConnectedUsers, setConnectedUsers } = require('./connectedUsers');
const _ = require('lodash');

const newNotification = (recipient, sender, type) => {
  const connectedUsers = getConnectedUsers();
  const recipientSocketIds = _.keys(
    _.pickBy(connectedUsers, user => {
      return user === recipient;
    }),
  );
  console.log('recipientSocketIds', recipientSocketIds);
  recipientSocketIds.forEach(socketId => {
    io.to(socketId).emit('new notification', sender, type);
  });
};

module.exports = newNotification;
