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
      console.log(
        `INSERT INTO public."Like" (likingUser, likedUser, date) VALUES (${likingUserId}, ${likedUserId}, Now() RETURNING id)`,
      );
      return await db
        .any(
          'INSERT INTO public."Like" ("likingUser", "likedUser", date) VALUES ($1, $2, NOW()) RETURNING id',
          [likingUserId, likedUserId],
        )
        .then(data => {
          return { success: true, created: true, id: data[0].id };
        });
    } catch (err) {
      console.log(err, 'in model Like.create()');
      return { created: false, error: err };
    }
  }

  async getBy(type, value) {
    try {
      if (!this.isValidType(type)) {
        console.log(`Like.getBy(): ${type} is not an authorized type`);
        return null;
      }
      console.log(
        `SELECT firstname, username, birthDate, location, popularityRate, profilePicture, date FROM public."Like" WHERE ${type} = ${value}`,
      );
      const result = await db.any(
        `SELECT firstname, username, "birthDate", location, "popularityRate", "profilePicture", date FROM public."Like", public."User"  WHERE $1:name = $2 AND "Like"."likingUser" = "User".id ORDER BY date DESC`,
        [type, value],
      );
      return result;
    } catch (err) {
      console.log(err, 'in model Like.getBy()');
      return null;
    }
  }

  async getAll() {
    try {
      console.log('SELECT * FROM public."Like"');
      const result = await db.any('SELECT * FROM public."Like"');
      return result;
    } catch (err) {
      console.log(err, 'in model Like.getAll()');
      return null;
    }
  }

  async exists(likingUser, likedUser) {
    try {
      console.log(
        `SELECT exists(SELECT from public."Like" WHERE "likingUser" = ${likingUser} AND "likedUser" = ${likedUser})`,
      );
      const result = await db.any(
        `SELECT exists(SELECT from public."Like" WHERE "likingUser" = $1 AND "likedUser" = $2);`,
        [likingUser, likedUser],
      );
      return result[0].exists;
    } catch (err) {
      console.log(err, 'in model Like.exists()');
      return null;
    }
  }

  async delete(likingUser, likedUser) {
    try {
      console.log(
        `DELETE FROM public."Like" WHERE "likingUser" = ${likingUser} AND "likedUser" = ${likedUser}`,
      );
      await db.any(
        'DELETE FROM public."Like" WHERE "likingUser" = $1  AND "likedUser" = $2',
        [likingUser, likedUser],
      );
      return { success: true, deleted: true };
    } catch (err) {
      console.log(err, 'in model User.delete()');
      return { deleted: false, error: err };
    }
  }
}

module.exports = Like;
