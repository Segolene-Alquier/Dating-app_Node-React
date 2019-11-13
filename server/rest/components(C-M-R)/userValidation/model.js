const { db, pgp } = require('../../../config/database');

class UserValidation {
  async create({ userId, type }) {
    if (type !== 'validationKey' && type !== 'resetPasssword') {
      console.log(err, 'in model User.create()');
      return {
        created: false,
        error: 'The type is not valid in model UserValidation.create()',
      };
    }
    try {
      const token = UserValidation.generateToken();
      console.log(
        `INSERT INTO public."UserValidation" (userId, ${type}) VALUES (${userId}, ${token})`,
      );
      await db.any(
        'INSERT INTO public."UserValidation" (userId, $1:name) VALUES ($2, $3)',
        [type, userId, token],
      );
      return { created: true };
    } catch (err) {
      console.log(err, 'in model User.create()');
      return { created: false, error: err };
    }
  }

  generateToken() {
    const length = 20;
    const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split(
      '',
    );
    const b = [];
    for (let i = 0; i < length; i + 1) {
      const j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
    }
    return b.join('');
  }
}

module.exports = UserValidation;
