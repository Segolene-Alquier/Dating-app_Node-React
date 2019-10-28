const Gender = require("./model")
const gender = new Gender();

async function getGenders(request, response) {
    try {
        let call = await gender.getAll()
        response.status(200).json(call)
    } 
    catch (err) {
        console.log(err);
        response.status(206).send(err);
    }
}

async function getGenderById(request, response) {
    const id = parseInt(request.params.id)
    try {
        let call = await gender.getBy('id', id)
        response.status(200).json(call)
    } 
    catch (err) {
        console.log(err);
        response.status(206).send(err);
    }
}

module.exports.getGenders = getGenders
module.exports.getGenderById = getGenderById
