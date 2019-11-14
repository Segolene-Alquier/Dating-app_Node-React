const { mailjetAPIKey, mailjetAPISecret } = require('./db-log');

// eslint-disable-next-line import/order
const mailjet = require('node-mailjet').connect(
  mailjetAPIKey,
  mailjetAPISecret,
);

module.exports.mailjet = mailjet;
