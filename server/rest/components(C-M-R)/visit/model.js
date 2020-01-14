const { db } = require('../../../config/database');

class Visit {
  isValidType(type) {
    const authorizedTypes = ['id', 'visitor', 'visited'];
    return authorizedTypes.some(authorizedType => {
      return type === authorizedType;
    });
  }

  async create(visitorId, visitedId) {
    try {
      console.log(
        `INSERT INTO public."Visit" (visitor, visited, date) VALUES (${visitorId}, ${visitedId} RETURNING id)`,
      );
      return await db
        .any(
          'INSERT INTO public."Visit" (visitor, visited, date) VALUES ($1, $2, NOW()) RETURNING id',
          [visitorId, visitedId],
        )
        .then(data => {
          return { created: true, id: data[0].id };
        });
    } catch (err) {
      console.log(err, 'in model Visit.create()');
      return { created: false, error: err };
    }
  }

  async getBy(type, value) {
    try {
      if (!this.isValidType(type)) {
        console.log(`Visit.getBy(): ${type} is not an authorized type`);
        return null;
      }
      console.log(
        `SELECT firstname, username, birthDate, location, popularityRate, profilePicture, date FROM public."Visit" WHERE ${type} = ${value}`,
      );
      const result = await db.any(
        `SELECT firstname, username, "birthDate", location, "popularityRate", "profilePicture", date, visitor, EXISTS(SELECT * FROM public."Like" WHERE "likingUser" = $2 AND "likedUser" = visitor) AS liking, EXISTS(SELECT * FROM public."Like" WHERE "likedUser" = $2 AND "likingUser" = visitor) AS liked  FROM public."Visit", public."User" WHERE $1:name = $2 AND "Visit".visitor = "User".id ORDER BY date DESC`,
        [type, value],
      );
      return result;
    } catch (err) {
      console.log(err, 'in model Visit.getBy()');
      return null;
    }
  }

  async getAll() {
    try {
      console.log('SELECT * FROM public."Visit"');
      const result = await db.any('SELECT * FROM public."Visit"');
      return result;
    } catch (err) {
      console.log(err, 'in model Visit.getAll()');
      return null;
    }
  }

  async exists(type, value) {
    try {
      if (!value) return false;
      if (!this.isValidType(type)) {
        console.log(`Visit.exists(): ${type} is not an authorized type`);
        return null;
      }
      console.log(
        `SELECT exists(SELECT from public."Visit" WHERE ${type} = ${value})`,
      );
      const result = await db.none(
        `SELECT exists(SELECT from public."Visit" WHERE id = ALL($2));`,
        [value],
      );
      return result[0].exists;
    } catch (err) {
      console.log(err, 'in model Visit.exists()');
      return null;
    }
  }
}

module.exports = Visit;
