const TokenGenerator = require('uuid-token-generator');
const { db } = require('../../../config/database');
const User = require('../user/model');

const user = new User();

const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);

class UserValidation {
  async create({ userId, type }) {
    if (type !== 'validationKey' && type !== 'resetPassword') {
      console.log('The type is not valid in model UserValidation.create()');
      return {
        created: false,
        error: 'The type is not valid in model UserValidation.create()',
      };
    }
    try {
      const token = tokgen.generate();
      console.log(
        `INSERT INTO public."UserValidation" (userId, ${type}) VALUES (${userId}, ${token})`,
      );
      await db.any(
        'INSERT INTO public."UserValidation" ("userId", $1:name) VALUES ($2, $3)',
        [type, userId, token],
      );
      return { created: true, token };
    } catch (err) {
      console.log(err, 'in model UserValidation.create()');
      return { created: false, error: err };
    }
  }

  async verifyConfirmationToken({ token }) {
    if (token === undefined) {
      console.log('The token is not defined');
      return {
        success: false,
        error: 'The token is not defined',
      };
    }
    try {
      return db
        .one(
          'DELETE FROM  public."UserValidation" WHERE "validationKey" = $1 RETURNING "userId"',
          token,
        )
        .then(({ userId }) => {
          user.updateById(userId, { validated: true });
          return {
            success: true,
            error: 'The account is now validated!',
          };
        })
        .catch(error => {
          if (error.received === 0) {
            return {
              success: false,
              error: 'The confirmation link is not valid',
            };
          }
          console.log(error, 'in model UserValidation.create()');
          return {
            success: false,
            error,
          };
        });
    } catch (err) {
      console.log(err, 'in model UserValidation.create()');
      return { success: false, error: err };
    }
  }
}
// const uv = new UserValidation();
// console.log(
//   uv.verifyConfirmationToken({
//     token: 'DKiVPwcK9MJ14o9xNaEp5rhvIuErfbrLwzvjP0RjF1W',
//   }),
// );
module.exports = UserValidation;
