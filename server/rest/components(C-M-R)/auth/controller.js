async function login(request, response) {
    try {
        // let call = await gender.getAll()
        response.status(200).json(call)
    } 
    catch (err) {
        console.log(err);
        response.status(206).send(err);
    }
}

async function logout(request, response) {
    try {
        // let call = await gender.getAll()
        response.status(200).json(call)
    } 
    catch (err) {
        console.log(err);
        response.status(206).send(err);
    }
}

module.exports.login = login
module.exports.logout = logout