const Visit = require('./model');

const visits = new Visit();

async function getVisits(request, response) {
  try {
    const call = await visits.getAll();
    response.status(200).json(call);
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

async function getVisitById(request, response) {
  const id = parseInt(request.params.id, 10);
  try {
    const call = await visits.getBy('id', id);
    response.status(200).json(call);
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

module.exports.getVisits = getVisits;
module.exports.getVisitById = getVisitById;
