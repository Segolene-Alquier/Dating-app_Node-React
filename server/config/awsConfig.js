const AWS = require('aws-sdk');
const bluebird = require('bluebird');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
});

AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();

module.exports.s3 = s3;
