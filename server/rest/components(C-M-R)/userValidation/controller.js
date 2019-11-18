const UserValidation = require('./model');
const {
  sendForgotPasswordEmail,
} = require('../../../mailer/sendForgotPasswordEmail');
const User = require('../user/model');

const user = new User();
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

async function verifyForgotPasswordToken(request, response) {
  try {
    const call = await uv.verifyForgotPasswordToken({
      token: request.params.token,
    });
    response.status(200).json(call);
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

async function forgotPassword(request, response) {
  const { email } = request.body;
  try {
    const userRequest = await user.getBy('email', email);
    if (userRequest.length) {
      const { id, firstname } = userRequest[0];
      console.log(id);
      const call = await uv.create({ userId: id, type: 'resetPassword' });
      if (call.created) {
        sendForgotPasswordEmail(email, firstname, call.token);
        response.status(206).send({ success: true });
      } else {
        response.status(206).send({ success: false, err: call });
      }
    } else {
      response.status(200).json({
        success: false,
        err: "This email doesn't exist",
      });
    }
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

async function forgotPasswordUpdate(request, response) {
  const { password } = request.body;
  try {
    const call = await uv.verifyForgotPasswordToken({
      token: request.params.token,
    });
    console.log(call);
    const { success, userId } = call;
    if (success) {
      // update password
      await user.updateById(userId, { password });
      uv.delete({ userId });
      response.status(206).send({ success: true });
    } else {
      response.status(206).send({ success: false, err: call.error });
    }
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

module.exports.verifyConfirmationToken = verifyConfirmationToken;
module.exports.forgotPassword = forgotPassword;
module.exports.verifyForgotPasswordToken = verifyForgotPasswordToken;
module.exports.forgotPasswordUpdate = forgotPasswordUpdate;
