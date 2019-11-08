const User = require('../user/model');
const user = new User();
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const secret = 'mignon4ever';

async function booleanToken(request, response) {
  let token = request.headers['x-access-token'] || request.headers['authorization'];
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
    });
    const userId = request.decoded.userid;
    const userData = await user.getByFiltered('id', userId, [
      'id',
      'firstname',
      'surname',
      'username',
      'validated',
      'suspended',
    ]);

    return response.json({
      success: true,
      message: 'Token is valid',
      data: userData[0],
    });
  } else {
    return response.json({
      success: false,
      message: 'Auth token not supplied',
    });
  }
}

async function login(request, response) {
  const { username, password } = request.body;

  console.log('User submitted: ', username, password);
  try {
    let visitor = await user.getBy('username', username);
    if (visitor.length <= 0) {
      console.log(username, " doesn't exist");
      response.json(false);
      return;
    }
    visitor = visitor[0];
    if (visitor['password'] === password) {
      let token = jwt.sign({ userid: visitor['id'] }, 'mignon4ever', { expiresIn: '24h' });
      console.log(token);
      response.json({
        success: true,
        token: token,
        err: null,
      });
    } else {
      console.log('Entered Password and Hash do not match!');
      response.status(401).json({
        success: false,
        token: null,
        err: 'Entered Password and Hash do not match!',
      });
    }
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

async function logout(request, response) {
  try {
    // let call = await gender.getAll()
    // response.status(200).json(call)
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

module.exports.login = login;
module.exports.logout = logout;
module.exports.booleanToken = booleanToken;
