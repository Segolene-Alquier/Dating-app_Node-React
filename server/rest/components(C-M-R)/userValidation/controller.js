const UserValidation = require('./model');

const uv = new UserValidation();

async function verifyConfirmationToken(request, response) {
  try {
    const call = await uv.verifyConfirmationToken({
      token: request.params.token,
    });
    response.status(200).json(call);
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

// async function getInterestById(request, response) {
//   const id = parseInt(request.params.id, 10);
//   try {
//     const call = await interests.getBy('id', id);
//     response.status(200).json(call);
//   } catch (err) {
//     console.log(err);
//     response.status(206).send(err);
//   }
// }

module.exports.verifyConfirmationToken = verifyConfirmationToken;
// module.exports.getInterestById = getInterestById;
