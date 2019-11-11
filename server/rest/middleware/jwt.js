const jwt = require('jsonwebtoken');
// var bcrypt = require('bcrypt');
const secret = 'mignon4ever';

async function checkToken(request, response, next) {
  let token =
    request.headers['x-access-token'] || request.headers.authorization;
  console.log('CHECK TOKEN : ', token);
  console.log('Headers : ', request.headers);
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return response.json({
          success: false,
          message: 'Token is not valid',
        });
      }
      request.decoded = decoded;
      next();
      return request.decoded;
    });
  } else {
    return response.json({
      success: false,
      message: 'Auth token not supplied',
    });
  }
  return null;
}

module.exports.checkToken = checkToken;
