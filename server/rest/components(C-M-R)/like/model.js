const { db } = require('../../../config/database');

class Like {
  isValidType(type) {
    const authorizedTypes = ['id', 'likingUser', 'likedUser'];
    return authorizedTypes.some(authorizedType => {
      return type === authorizedType;
    });
  }

  async create(likingUserId, likedUserId) {
    try {
      if (process.env.VERBOSE === 'true')
        console.log(
          `INSERT INTO public."Like" (likingUser, likedUser, date) VALUES (${likingUserId}, ${likedUserId}, Now() RETURNING id)`,
        );
      return await db
        .any(
          'INSERT INTO public."Like" ("likingUser", "likedUser", date) VALUES ($1, $2, NOW()) RETURNING id, EXISTS(SELECT * FROM public."Like" WHERE "likingUser" = $2 AND "likedUser" = $1) AS match',
          [likingUserId, likedUserId],
        )
        .then(data => {
          return {
            success: true,
            created: true,
            id: data[0].id,
            match: data[0].match,
          };
        });
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Like.create()');
      return { created: false, error: err };
    }
  }

  async getBy(type, value) {
    try {
      if (!this.isValidType(type)) {
        if (process.env.VERBOSE === 'true')
          console.log(`Like.getBy(): ${type} is not an authorized type`);
        return null;
      }
      if (process.env.VERBOSE === 'true')
        console.log(
          `SELECT firstname, username, birthDate, location, popularityRate, profilePicture, date
        FROM public."Like"
        WHERE ${type} = ${value}`,
        );
      const result = await db.any(
        `SELECT firstname, username, "birthDate", location, "popularityRate", "profilePicture", "likingUser" AS visitor, "likedUser" AS visited, date,
        EXISTS(SELECT * FROM public."Like" AS secondlike WHERE secondlike."likingUser" = $2 AND secondlike."likedUser" = "Like"."likingUser") AS liking
        FROM public."Like" , public."User"
        WHERE $1:name = $2 AND "Like"."likingUser" = "User".id
        AND NOT EXISTS (
        SELECT  *
        FROM public."Block"
        WHERE "blockedUser" = $2
        AND "blockingUser" = "likingUser"
        )
        ORDER BY date DESC`,
        [type, value],
      );
      result.forEach(element => {
        element.match = element.liking;
      });
      return result;
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Like.getBy()');
      return null;
    }
  }

  async getAll() {
    try {
      if (process.env.VERBOSE === 'true')
        console.log('SELECT * FROM public."Like"');
      const result = await db.any('SELECT * FROM public."Like"');
      return result;
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Like.getAll()');
      return null;
    }
  }

  async exists(likingUser, likedUser) {
    try {
      if (process.env.VERBOSE === 'true')
        console.log(
          `SELECT exists(SELECT from public."Like" WHERE "likingUser" = ${likingUser} AND "likedUser" = ${likedUser})`,
        );
      const result = await db.any(
        `SELECT exists(SELECT from public."Like" WHERE "likingUser" = $1 AND "likedUser" = $2);`,
        [likingUser, likedUser],
      );
      return result[0].exists;
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Like.exists()');
      return null;
    }
  }

  async relationship(visitorUser, visitedUser) {
    try {
      if (process.env.VERBOSE === 'true')
        console.log(
          `SELECT exists(SELECT from public."Like" WHERE "likingUser" = $1 AND "likedUser" = $2) AS visitorlikevisited, exists(SELECT from public."Like" WHERE "likedUser" = $1 AND "likingUser" = $2) AS visitedlikevisitor`,
        );
      const result = await db.any(
        `SELECT exists(SELECT from public."Like" WHERE "likingUser" = $1 AND "likedUser" = $2) AS visitorlikevisited, exists(SELECT from public."Like" WHERE "likedUser" = $1 AND "likingUser" = $2) AS visitedlikevisitor`,
        [visitorUser, visitedUser],
      );
      result[0].match =
        result[0].visitorlikevisited && result[0].visitedlikevisitor;
      return result[0];
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Like.exists()');
      return null;
    }
  }

  async delete(likingUser, likedUser) {
    try {
      if (process.env.VERBOSE === 'true')
        console.log(
          `DELETE FROM public."Like" WHERE "likingUser" = ${likingUser} AND "likedUser" = ${likedUser}`,
        );
      const result = await db.any(
        'DELETE FROM public."Like" WHERE "likingUser" = $1  AND "likedUser" = $2 RETURNING EXISTS(SELECT from public."Like" WHERE "likedUser" = $1 AND "likingUser" = $2) AS unmatch',
        [likingUser, likedUser],
      );
      if (process.env.VERBOSE === 'true') console.log(result[0].unmatch);
      return { success: true, deleted: true, unmatch: result[0].unmatch };
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model User.delete()');
      return { deleted: false, error: err };
    }
  }
}

module.exports = Like;
