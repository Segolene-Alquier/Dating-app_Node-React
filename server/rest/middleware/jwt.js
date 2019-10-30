const User = require("../components(C-M-R)/user/model")
// const user = new User();
const jwt = require('jsonwebtoken')
// const exjwt = require('express-jwt');
// var bcrypt = require('bcrypt');
const secret = 'mignon4ever'


async function withAuth(request, response, next) {
    let token = request.headers['x-access-token'] || request.headers['authorization']
    
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length)
        }
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return (response.json({
                    success: false,
                    message: 'Token is not valid'
                }))
            }
            else {
                request.decoded = decoded
                next()
            }
        })
    }
    else {
        return (response.json({
            succes: false,
            message: 'Auth token not supplied' 
        }))
    }
}

module.exports.withAuth = withAuth
