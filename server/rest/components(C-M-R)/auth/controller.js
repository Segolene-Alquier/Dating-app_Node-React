const jwt = require('jsonwebtoken');
const User = require('../user/model');
const bcrypt = require('bcrypt');

const user = new User();

const secret = 'mignon4ever';

async function booleanToken(request, response) {
  let token =
    request.headers['x-access-token'] || request.headers.authorization;
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
      return request.decoded;
    });
    const userId = request.decoded.userid;
    const { lon, lat } = request.query;
    if (lon && lat) {
      const location = [parseFloat(lon), parseFloat(lat)];
      user.updateById(userId, { location });
    }
    const userData = await user.getByFiltered('id', userId, [
      'id',
      'firstname',
      'surname',
      'username',
      'email',
      'location',
      'birthDate',
      'popularityRate',
      'gender',
      'sexualOrientation',
      'description',
      'interests',
      'images',
      'profilePicture',
      'notificationMail',
      'notificationPush',
    ]);

    return response.json({
      success: true,
      message: 'Token is valid',
      data: userData[0],
    });
  }
  return response.json({
    success: false,
    message: 'Auth token not supplied',
  });
}

async function login(request, response) {
  const { username, password, lon, lat } = request.body;

  console.log('User submitted: ', username, password);
  try {
    const query = await user.getBy('username', username);
    if (query.length <= 0) {
      console.log(username, " doesn't exist");
      response.status(200).json({
        success: false,
        token: null,
        err: `${username} doesn't exist`,
      });
      return;
    }
    const [visitor] = query;
    if (visitor.suspended) {
      response.status(200).json({
        success: false,
        token: null,
        err: 'Your account has been suspended',
      });
      return;
    }
    console.log('compare : ', visitor.password, password);
    if (bcrypt.compareSync(password, visitor.password)) {
      if (visitor.validated) {
        const token = jwt.sign({ userid: visitor.id }, 'mignon4ever', {
          expiresIn: '1d',
        });
        if (lon && lat) {
          const location = [parseFloat(lon), parseFloat(lat)];
          console.log(
            user.updateById(visitor.id, { location, lastConnection: 'now()' }),
          );
        } else {
          console.log(
            await user.updateById(visitor.id, {
              lastConnection: 'now()',
            }),
          );
        }

        console.log(token);
        response.json({
          success: true,
          token,
          err: null,
        });
      } else {
        response.status(200).json({
          success: false,
          token: null,
          err: 'The user is not validated',
        });
      }
    } else {
      console.log('The login and password do not match!');
      response.status(200).json({
        success: false,
        token: null,
        err: 'The login and password do not match!',
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
