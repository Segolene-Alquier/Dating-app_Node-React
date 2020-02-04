const _ = require('lodash');
const { db } = require('../../../config/database');

class Chat {
  isValidType(type) {
    const authorizedTypes = [
      'currentUser',
      'id',
      'user1',
      'user2',
      ['user1', 'user2'],
    ];
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
        console.log(`Chat.getBy(): ${type} is not an authorized type`);
        return null;
      }
      console.log(
        `SELECT id, firstname, profilePicture FROM public."User" INNER JOIN public."Match" ON ("User".id = "Match".${type[0]} OR "User".id = "Match".${type[1]}) AND "User".id != ${value} WHERE "Match".${type[0]} = ${value} OR "Match".${type[1]} = ${value}`,
      );
      const result = await db.any(
        `SELECT "User".id, "User".firstname, "User"."profilePicture", "Match".id AS matchId
          FROM public."User" INNER JOIN public."Match"
          ON ("User".id = "Match".user1 OR "User".id = "Match".user2) AND "User".id != $2
          WHERE "Match".user1 = $2 OR "Match".user2 = $2`,
        [type, value],
      );
      return result;
    } catch (err) {
      console.log(err, 'in model Chat.getBy()');
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
