const TokenGenerator = require('uuid-token-generator');
const { db } = require('../../../config/database');

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
      console.log(err, 'in model User.create()');
      return { created: false, error: err };
    }
  }
}

module.exports = UserValidation;
