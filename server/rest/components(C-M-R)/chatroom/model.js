const _ = require('lodash');
const { db } = require('../../../config/database');
const User = require('../user/model');
const Block = require('./../block/model');
const Match = require('./../match/model');

const block = new Block();
const user = new User();
const match = new Match();

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
      if (process.env.VERBOSE === 'true')
        console.log(
          `INSERT INTO public."Message" ("match", "author", "content", "creationDate", "read") VALUES (${match}, ${author}, ${content}, Now(), false RETURNING id`,
        );
      const picture = await user.getByFiltered('id', author, [
        'profilePicture',
      ]);
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
            profilePicture: picture[0].profilePicture,
          };
        });
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Chatroom.create()');
      return { created: false, error: err };
    }
  }

  async delete(matchId) {
    try {
      if (process.env.VERBOSE === 'true')
        console.log(`DELETE FROM public."Message" WHERE match = ${matchId}`);
      await db.any('DELETE FROM public."Message" WHERE match = $1', [matchId]);
      return { success: true, deleted: true };
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model User.delete()');
      return { deleted: false, error: err };
    }
  }

  async numberUnread(recipient) {
    try {
      if (process.env.VERBOSE === 'true')
        console.log(
          `SELECT COUNT(*) FROM public."Message" WHERE recipient = ${recipient} AND read = false`,
        );
      const result = await db.any(
        `SELECT COUNT(*) FROM public."Message"
        INNER JOIN public."Match"
        ON("Message".match = "Match".id)
        WHERE ("Match".user1 = $1 OR "Match".user2 = $1) AND "Message".author != $1 AND read = false`,
        [recipient],
      );
      return result[0].count;
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Notification.numberUnread()');
      return null;
    }
  }

  async canAccessChat(matchId) {
    const matchedUsers = await match.getUsersFromMatchId(matchId);
    if (matchedUsers) {
      const blocked1 = await block.exists(matchedUsers[0], matchedUsers[1]);
      const blocked2 = await block.exists(matchedUsers[1], matchedUsers[0]);
      const banned1 = await user.getByFiltered('id', matchedUsers[0], [
        'suspended',
      ]);
      const banned2 = await user.getByFiltered('id', matchedUsers[1], [
        'suspended',
      ]);
      return (
        !blocked1 && !blocked2 && !banned1[0].suspended && !banned2[0].suspended
      );
    }
    return false;
  }

  async getBy(type, value) {
    try {
      if (!this.isValidType(type)) {
        if (process.env.VERBOSE === 'true')
          console.log(`Chat.getBy(): ${type} is not an authorized type`);
        return null;
      }
      if (process.env.VERBOSE === 'true')
        console.log(
          `SELECT id, firstname, profilePicture FROM public."User" INNER JOIN public."Match" ON ("User".id = "Match".${type[0]} OR "User".id = "Match".${type[1]}) AND "User".id != ${value} WHERE "Match".${type[0]} = ${value} OR "Match".${type[1]} = ${value}`,
        );
      const result = await db.any(
        `SELECT "User".id, "User".firstname, "User"."profilePicture", "Match"."lastMessage" AS "lastMessage", "Match".id AS matchId, "Message".content, "Message".read
          FROM public."User" INNER JOIN public."Match"
          ON ("User".id = "Match".user1 OR "User".id = "Match".user2) AND "User".id != $2
          FULL OUTER JOIN public."Message"
          ON "lastMessage" = "Message".id
          WHERE ("Match".user1 = $2 OR "Match".user2 = $2) AND "User".suspended = false
          AND NOT EXISTS(SELECT * FROM public."Block" WHERE "blockedUser" = $2)
          ORDER BY "Message".id DESC NULLS LAST`,
        [type, value],
      );
      return result;
    } catch (err) {
      console.log(err, 'in model Chat.getBy()');
      return null;
    }
  }

  async userCanAccessMatch(matchId, userId) {
    try {
      const result = await db.any(
        `SELECT EXISTS(SELECT * FROM public."Match" WHERE id = $1 AND (user1 = $2 OR user2 = $2))`,
        [matchId, userId],
      );
      const accessOk = await this.canAccessChat(matchId);

      return result[0].exists && accessOk;
    } catch (err) {
      if (process.env.VERBOSE === 'true') console.log(err);
      return null;
    }
  }

  async updateRead(matchId, userId) {
    try {
      if (process.env.VERBOSE === 'true')
        console.log(
          `UPDATE public."Message" SET read = true WHERE match = ${matchId} AND author != ${userId} AND read = false`,
        );
      const result = await db.any(
        `UPDATE public."Message" SET read = true WHERE match = $1 AND author != $2 AND read = false`,
        [matchId, userId],
      );
      return result;
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Chat.getAll()');
      return null;
    }
  }

  async getAll(matchId) {
    try {
      if (process.env.VERBOSE === 'true')
        console.log(`SELECT * FROM public."Message" WHERE match = ${matchId}`);
      const result = await db.any(
        `SELECT "Message".id, "Message".match, "Message".author, "Message".content, "Message"."creationDate", "Message".read, "User"."profilePicture"
        FROM public."Message" INNER JOIN public."User"
        ON("Message".author = "User".id)
        WHERE match = $1
        ORDER BY "creationDate" ASC`,
        [matchId],
      );
      return result;
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Chat.getAll()');
      return null;
    }
  }
}

module.exports = Chat;
