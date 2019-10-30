const User = require("../user/model")
const user = new User();
const jwt = require('jsonwebtoken')
const exjwt = require('express-jwt');
const jwtMW = exjwt({
    secret: 'mignon4ever'
});



async function login(request, response) {
    const { username, password } = request.body
    // console.log("JWT : ", jwtMW)

    console.log("User submitted: ", username, password);
    try {
        let visitor = await user.getBy('username', username)
        if (visitor.length <= 0) {
            console.log(username, " doesn't exist")
            response.json(false)
            return
        }
        visitor = visitor[0]
        if (visitor['password'] === password) {
            let token = jwt.sign({userid: visitor['id']}, 'mignon4ever', {expiresIn: "24h"})
            console.log(token)
            response.json({
                success: true,
                token: token,
                err: null
            })
        }
        else {
            console.log("Entered Password and Hash do not match!");
            response.status(401).json({
                success: false,
                token: null,
                err: 'Entered Password and Hash do not match!'
            })
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