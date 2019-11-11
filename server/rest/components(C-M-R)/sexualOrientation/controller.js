const SexualOrientation = require('./model');

const sexualOrientation = new SexualOrientation();

async function getSexualOrientations(request, response) {
  try {
    const call = await sexualOrientation.getAll();
    response.status(200).json(call);
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

async function getSexualOrientationById(request, response) {
  const id = parseInt(request.params.id, 10);
  try {
    const call = await sexualOrientation.getBy('id', id);
    response.status(200).json(call);
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

module.exports.getSexualOrientations = getSexualOrientations;
module.exports.getSexualOrientationById = getSexualOrientationById;
