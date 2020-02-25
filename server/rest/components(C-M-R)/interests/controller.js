const Interest = require('./model');

const interests = new Interest();

async function getInterests(request, response) {
  try {
    const call = await interests.getAll();
    response.status(200).json(call);
  } catch (err) {
    if (process.env.VERBOSE === 'true') console.log(err);
    response.status(206).send(err);
  }
}

async function getInterestById(request, response) {
  const id = parseInt(request.params.id, 10);
  try {
    const call = await interests.getBy('id', id);
    response.status(200).json(call);
  } catch (err) {
    if (process.env.VERBOSE === 'true') console.log(err);
    response.status(206).send(err);
  }
}

module.exports.getInterests = getInterests;
module.exports.getInterestById = getInterestById;
