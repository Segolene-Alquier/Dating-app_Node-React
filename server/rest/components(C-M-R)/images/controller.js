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

const deleteFile = url => {
  const name = url.match(/[^\/]+\/[^\/]+\/[^\/]+$/)[0];
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: name,
  };
  return s3.deleteObject(params).promise();
};

async function uploadImage(request, response) {
  const id = request.decoded.userid;
  try {
    const length = await user.getByFiltered('id', id, ['images']).then(data => {
      return data[0].images.length;
    });
    if (length >= 5) {
      return response.status(400).send('A user can only upload 5 pictures');
    }
  } catch (error) {
    console.log(error);
    return response.status(400).send(error);
  }
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const { path } = files.file[0];
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `${process.env.ENVIRONMENT}/${id}/${timestamp}`;
      const data = await uploadFile(buffer, fileName, type);
      await user.addElementToArrayById(id, 'images', data.Location);
      await user.updateProfilePictureIfNotExist(id);
      return response.status(200).send(data);
    } catch (error) {
      console.log(error);
      return response.status(400).send(error);
    }
  });
}

async function deleteImage(request, response) {
  const id = request.decoded.userid;
  const { url } = request.body;
  try {
    await user.deleteElementToArrayById(id, 'images', url);
    await user.updateProfilePictureIfNotExist(id);
    if (!url.includes('generated.photos')) {
      await deleteFile(url);
    }
    return response.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    return response.status(400).send({ success: false, error });
  }
}

module.exports.uploadImage = uploadImage;
module.exports.deleteImage = deleteImage;
module.exports.deleteFile = deleteFile;
