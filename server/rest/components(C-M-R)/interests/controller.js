const Interest = require("./model")
const interests = new Interest();

async function getInterests(request, response) {
    try {
        let call = await interests.getAll()
        response.status(200).json(call)
    } 
    catch (err) {
        console.log(err);
        response.status(206).send(err);
    }
}

async function getInterestById(request, response) {
    const id = parseInt(request.params.id)
    try {
        let call = await interests.getBy('id', id)
        response.status(200).json(call)
    } 
    catch (err) {
        console.log(err);
        response.status(206).send(err);
    }
}

module.exports = {
    getInterests,
    getInterestById,
  }