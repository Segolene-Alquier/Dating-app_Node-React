const Visit = require('./model');
const _ = require('lodash');

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

async function getVisitsFromCurrentUser(request, response) {
  const id = request.decoded.userid;
  try {
    let call = await visits.getBy('visited', id);
    call = _.uniqBy(call, 'visitor');
    response.status(200).json(call);
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

module.exports.getVisits = getVisits;
module.exports.getVisitsFromCurrentUser = getVisitsFromCurrentUser;
