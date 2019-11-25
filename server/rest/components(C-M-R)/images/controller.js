const multiparty = require('multiparty');
const fs = require('fs');
const fileType = require('file-type');
const { s3 } = require('./../../../config/awsConfig');
const User = require('../user/model');

const user = new User();

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};

async function uploadImage(request, response) {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const { path } = files.file[0];
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const id = request.decoded.userid;
      const fileName = `development/${id}/${timestamp}`;
      const data = await uploadFile(buffer, fileName, type);
      console.log(await user.updateArrayById(id, 'images', data.Location));
      return response.status(200).send(data);
    } catch (error) {
      console.log(error);
      return response.status(400).send(error);
    }
  });
}

module.exports.uploadImage = uploadImage;
