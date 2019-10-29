const User = require("../user/model")
const user = new User();
const jwt = require('jsonwebtoken')
const exjwt = require('express-jwt');
const jwtMW = exjwt({
    secret: 'mignon4ever'
});


async function login(request, response) {
    const { username, password } = request.body
    console.log("User submitted: ", username, password);

    try {
        let visitor = await user.getBy('username', username)
        if (visitor.length <= 0) { 
            response.status(403).json(false)
        }
        visitor = visitor[0]
        if (visitor['password'] === password) {
        // create token
        }
    } 
    catch (err) {
        console.log(err);
        response.status(206).send(err);
    }
}

async function logout(request, response) {
    try {
        // let call = await gender.getAll()
        // response.status(200).json(call)
    } 
    catch (err) {
        console.log(err);
        response.status(206).send(err);
    }
}

module.exports.login = login
module.exports.logout = logout