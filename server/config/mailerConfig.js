// eslint-disable-next-line import/order
const mailjet = require('node-mailjet').connect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET,
);

module.exports.mailjet = mailjet;
