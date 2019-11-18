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
      // await db.any(
      //   'INSERT INTO public."UserValidation" ("userId", $1:name) VALUES ($2, $3)',
      //   [type, userId, token],
      // );
      await db.any(
        'UPDATE public."UserValidation" SET $1:name=$3 WHERE "userId"=$2; INSERT INTO public."UserValidation" ("userId", $1:name) SELECT $2, $3 WHERE NOT EXISTS (SELECT 1 FROM public."UserValidation" WHERE "userId"=$2)',
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

  async verifyForgotPasswordToken({ token }) {
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
          'SELECT * FROM public."UserValidation" WHERE "resetPassword" = $1',
          token,
        )
        .then(data => {
          return {
            success: true,
            userId: data.userId,
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

  async delete({ userId }) {
    try {
      db.any('DELETE FROM public."UserValidation" WHERE "userId" = $1', userId);
      return;
    } catch (error) {
      console.log(error, 'in model UserValidation.delete()');
      return { success: false, error };
    }
  }
}
module.exports = UserValidation;
