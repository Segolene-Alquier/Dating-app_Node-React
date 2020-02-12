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

  async create(match, author, content) {
    try {
      console.log(
        `INSERT INTO public."Message" ("match", "author", "content", "creationDate", "read") VALUES (${match}, ${author}, ${content}, Now(), false RETURNING id`,
      );
      return await db
        .any(
          'INSERT INTO public."Message" ("match", "author", "content", "creationDate", "read") VALUES ($1, $2, $3, NOW(), false) RETURNING id, match, author, content, "creationDate", read',
          [match, author, content],
        )
        .then(data => {
          return {
            created: true,
            id: data[0].id,
            match: data[0].match,
            author: data[0].author,
            content: data[0].content,
            creationDate: data[0].creationDate,
            read: data[0].read,
          };
        });
    } catch (err) {
      console.log(err, 'in model Chatroom.create()');
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
  async getAll(value) {
    try {
      console.log(`SELECT * FROM public."Message" WHERE match = ${value}`);
      const result = await db.any(
        `SELECT "Message".id, "Message".match, "Message".author, "Message".content, "Message"."creationDate", "Message".read, "User"."profilePicture"
        FROM public."Message" INNER JOIN public."User"
        ON("Message".author = "User".id)
        WHERE match = $1
        ORDER BY "creationDate" ASC`,
        [value],
      );
      return result;
    } catch (err) {
      console.log(err, 'in model Chat.getAll()');
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
