const _ = require('lodash');
const { db } = require('../../../config/database');

class Chat {
  isValidType(type) {
    const authorizedTypes = ['id', 'user1', 'user2', ['user1', 'user2']];
    return authorizedTypes.some(authorizedType => {
      return _.isEqual(type, authorizedType);
    });
  }

  async create(user1, user2) {
    try {
      console.log(
        `INSERT INTO public."Match" (user1, user2, date) VALUES (${user1}, ${user2}, Now() RETURNING id`,
      );
      return await db
        .any(
          'INSERT INTO public."Match" ("user1", "user2", date) VALUES ($1, $2, NOW()) RETURNING id',
          [user1, user2],
        )
        .then(data => {
          return {
            created: true,
            id: data[0].id,
          };
        });
    } catch (err) {
      console.log(err, 'in model Like.create()');
      return { created: false, error: err };
    }
  }

  async delete(user1, user2) {
    try {
      console.log(
        `DELETE FROM public."Match" WHERE "user1" = ${user1} AND "user2" = ${user2}`,
      );
      await db.any(
        'DELETE FROM public."Match" WHERE ("user1" = $1  AND "user2" = $2) OR ("user1" = $2  AND "user2" = $1)',
        [user1, user2],
      );
      return { success: true, deleted: true };
    } catch (err) {
      console.log(err, 'in model User.delete()');
      return { deleted: false, error: err };
    }
  }

  async getBy(type, value) {
    try {
      if (!this.isValidType(type)) {
        console.log(`Match.getBy(): ${type} is not an authorized type`);
        return null;
      }
      console.log(`SELECT * FROM public."Match" WHERE ${type} = ${value}`);
      if (type instanceof Array && type.length === 2) {
        return db.any(
          `SELECT * FROM public."Match" WHERE $1:name = $3 OR $2:name = $3`,
          [type[0], type[1], value],
        );
      }
      const result = await db.any(
        `SELECT * FROM public."Match" WHERE $1:name = $2`,
        [type, value],
      );
      return result;
    } catch (err) {
      console.log(err, 'in model Match.getBy()');
      return null;
    }
  }

  async getAll() {
    try {
      console.log('SELECT * FROM public."Match"');
      const result = await db.any('SELECT * FROM public."Match"');
      return result;
    } catch (err) {
      console.log(err, 'in model Match.getAll()');
      return null;
    }
  }

  async exists(type, value) {
    try {
      if (!value) return false;
      if (!this.isValidType(type)) {
        console.log(`Match.exists(): ${type} is not an authorized type`);
        return null;
      }
      console.log(
        `SELECT exists(SELECT from public."Match" WHERE ${type} = ${value})`,
      );
      const result = await db.none(
        `SELECT exists(SELECT from public."Match" WHERE id = ALL($2));`,
        [value],
      );
      return result[0].exists;
    } catch (err) {
      console.log(err, 'in model Match.exists()');
      return null;
    }
  }
}

module.exports = Chat;
