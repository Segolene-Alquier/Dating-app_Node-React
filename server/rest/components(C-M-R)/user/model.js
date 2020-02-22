const { db, pgp } = require('../../../config/database');
const bcrypt = require('bcrypt');

class User {
  isValidType(type) {
    const authorizedTypes = ['id', 'email', 'username', 'images'];
    return authorizedTypes.some(authorizedType => {
      return type === authorizedType;
    });
  }

  async getBy(type, value) {
    try {
      if (!this.isValidType(type)) {
        console.log(`User.getBy(): ${type} is not an authorized type`);
        return null;
      }
      console.log(`SELECT * FROM public."User" WHERE ${type} = ${value}`);
      const result = await db.any(
        `SELECT * FROM public."User" WHERE $1:name = $2`,
        [type, value],
      );
      return result;
    } catch (err) {
      console.log(err, 'in model User.getBy()');
      return null;
    }
  }

  async getByFiltered(type, value, inputs) {
    try {
      if (!this.isValidType(type)) {
        console.log(`User.getBy(): ${type} is not an authorized type`);
        return null;
      }
      console.log(
        `SELECT ${inputs} FROM public."User" WHERE ${type} = ${value}`,
      );
      const result = await db.any(
        `SELECT $1:name FROM public."User" WHERE $2:name = $3`,
        [inputs, type, value],
      );
      return result;
    } catch (err) {
      console.log(err, 'in model User.getBy()');
      return null;
    }
  }

  ageToBirthdate(age) {
    if (age > 130) {
      age = 100;
    } else if (age < 18) {
      age = 18;
    }
    return new Date(new Date().setFullYear(new Date().getFullYear() - age))
      .toISOString()
      .split('T')[0];
  }

  async searchUser(age, popularityRate, interests, currentUserId) {
    try {
      let [ageMinimum, ageMaximum] = age;
      let [popularityRateMinimum, popularityRateMaximum] = popularityRate;

      if (!ageMinimum) {
        ageMinimum = 18;
      }
      if (!ageMaximum) {
        ageMaximum = 80;
      }
      if (!popularityRateMinimum) {
        popularityRateMinimum = 0;
      }
      if (!popularityRateMaximum) {
        popularityRateMaximum = 100;
      }
      if (!interests) {
        interests = [];
      }

      const result = await db.any(
        ` SELECT id AS visitor, firstname, username, location,
          "birthDate", "popularityRate", gender, "sexualOrientation",
          description, interests, images, "profilePicture", suspended,
          EXISTS(SELECT * FROM public."Like" WHERE "likingUser" = $6 AND "likedUser" = "User".id) AS liking,
          EXISTS(SELECT * FROM public."Like" WHERE "likedUser" = $6 AND "likingUser" = "User".id) AS liked
          FROM public."User"
          WHERE "birthDate" <= $1
          AND "birthDate" >= $2
          AND "popularityRate" >= $3
          AND "popularityRate" <= $4
          AND interests @> $5::text[]
          AND suspended = false
          AND id != $6
          AND NOT EXISTS (
          SELECT  *
          FROM public."Block"
          WHERE "blockedUser" = $6
          AND "blockingUser" = "User".id
          )`,
        [
          this.ageToBirthdate(ageMinimum),
          this.ageToBirthdate(ageMaximum),
          popularityRateMinimum,
          popularityRateMaximum,
          interests,
          currentUserId,
        ],
      );
      return result;
    } catch (err) {
      console.log(err, 'in model User.searchUser()');
      return null;
    }
  }

  async compatibleUser(age, popularityRate, interests, currentUserId) {
    try {
      let [ageMinimum, ageMaximum] = age;
      let [popularityRateMinimum, popularityRateMaximum] = popularityRate;

      if (!ageMinimum) {
        ageMinimum = 18;
      }
      if (!ageMaximum) {
        ageMaximum = 80;
      }
      if (!popularityRateMinimum) {
        popularityRateMinimum = 0;
      }
      if (!popularityRateMaximum) {
        popularityRateMaximum = 100;
      }
      if (!interests) {
        interests = [];
      }

      const currentUserPreferences = await this.getByFiltered(
        'id',
        currentUserId,
        ['gender', 'sexualOrientation'],
      );

      const result = await db.any(
        ` SELECT id AS visitor, firstname, username, location,
          "birthDate", "popularityRate", gender, "sexualOrientation",
          description, interests, images, "profilePicture", suspended,
          EXISTS(SELECT * FROM public."Like" WHERE "likingUser" = $6 AND "likedUser" = "User".id) AS liking,
          EXISTS(SELECT * FROM public."Like" WHERE "likedUser" = $6 AND "likingUser" = "User".id) AS liked
          FROM public."User"
          WHERE "birthDate" <= $1
          AND "birthDate" >= $2
          AND "popularityRate" >= $3
          AND "popularityRate" <= $4
          AND interests @> $5::text[]
          AND suspended = false
          AND id != $6
          AND gender && $8::smallint[]
          AND "sexualOrientation" && $7::smallint[]
          AND NOT EXISTS (
          SELECT  *
          FROM public."Block"
          WHERE "blockedUser" = $6
          AND "blockingUser" = "User".id
          )
          AND NOT EXISTS (SELECT * FROM public."Like" WHERE "likingUser" = $6 AND "likedUser" = "User".id)
          `,
        [
          this.ageToBirthdate(ageMinimum),
          this.ageToBirthdate(ageMaximum),
          popularityRateMinimum,
          popularityRateMaximum,
          interests,
          currentUserId,
          currentUserPreferences[0].gender,
          currentUserPreferences[0].sexualOrientation,
        ],
      );
      return result;
    } catch (err) {
      console.log(err, 'in model User.searchUser()');
      return null;
    }
  }

  async updateById(id, values) {
    try {
      console.log(values);
      const query = `${pgp.helpers.update(
        values,
        values,
        `User`,
      )} WHERE id = $/id/`;
      console.log(query, id);
      console.log(await db.any(query, {id}));
    } catch (err) {
      console.log(err, 'in model User.updateById()');
    }
  }

  async updateProfilePictureIfNotExist(id) {
    try {
      return await db.any(
        'UPDATE public."User" SET "profilePicture" = (SELECT images[1] FROM Public."User" WHERE id = $1) WHERE (id = $1 AND "profilePicture" IS NULL)',
        [id],
      );
    } catch (err) {
      console.log(err, 'in model User.updateIfNotExist()');
      return err;
    }
  }

  async updatePopularityRate(id) {
    try {
      return await db.any(
        `UPDATE Public."User" SET "popularityRate" = (
          SELECT LEAST( ROUND( COALESCE(NULLIF(COUNT(*)::decimal, 0), 1)
         / ( SELECT COALESCE(NULLIF(COUNT(*)::decimal * 0.7 , 0),1) FROM Public."Visit" WHERE visited = $1)
         * 100), 100)
         FROM Public."Like" WHERE "likedUser" = $1 )
         WHERE id = $1 RETURNING "popularityRate"`,
        [id],
      );
    } catch (err) {
      console.log(err, 'in model User.updatePopularityRate()');
      return err;
    }
  }

  async addElementToArrayById(id, type, value) {
    try {
      if (!this.isValidType(type)) {
        console.log(`User.getBy(): ${type} is not an authorized type`);
        return null;
      }
      console.log(
        `UPDATE public."User" SET ${type} = ${value} WHERE id = ${id}`,
      );
      const result = await db.any(
        'UPDATE public."User" SET $1:name = $1:name || $2 WHERE id = $3',
        [type, [value], id],
      );
      return result;
    } catch (err) {
      console.log(err, 'in model User.addElementToArrayById()');
      return null;
    }
  }

  async deleteElementToArrayById(id, type, value) {
    try {
      if (!this.isValidType(type)) {
        console.log(`User.getBy(): ${type} is not an authorized type`);
        return null;
      }
      console.log(
        `UPDATE public."User" SET ${type} = ${value} WHERE id = ${id}`,
      );
      const result = await db.any(
        'UPDATE public."User" SET $1:name = array_remove($1:name, $2), "profilePicture" = NULLIF("profilePicture", $2) WHERE id = $3',
        [type, value, id],
      );
      console.log('RESULT OF deleteElementToArrayById', result);
      return result;
    } catch (err) {
      console.log(err, 'in model User.deleteElementToArrayById()');
      return null;
    }
  }

  async exists(type, value) {
    try {
      if (!value) return false;
      // console.log(type)
      if (!this.isValidType(type)) {
        console.log(`User.exists(): ${type} is not an authorized type`);
        return null;
      }
      console.log(
        `SELECT exists(SELECT from public."User" WHERE ${type} = ${value})`,
      );
      const result = await db.any(
        `SELECT exists(SELECT from public."User" WHERE $1:name = $2);`,
        [type, value],
      );
      return result[0].exists;
    } catch (err) {
      console.log(err, 'in model User.exists()');
      return null;
    }
  }

  async getAll() {
    try {
      console.log('SELECT * FROM public."User"');
      const result = await db.any('SELECT * FROM public."User"');
      return result;
    } catch (err) {
      console.log(err, 'in model User.getAll()');
      return null;
    }
  }

  async create({ firstname, surname, username, password, email }) {
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      console.log(
        `INSERT INTO public."User" (firstname, surname, username, password, email) VALUES (${firstname}, ${surname}, ${username}, ${hashedPassword}, ${email}) RETURNING id`,
      );
      return await db
        .any(
          'INSERT INTO public."User" (firstname, surname, username, password, email) VALUES ($1, $2, $3, $4, $5) RETURNING id',
          [firstname, surname, username, hashedPassword, email],
        )
        .then(data => {
          return { created: true, id: data[0].id };
        });
    } catch (err) {
      console.log(err, 'in model User.create()');
      return { created: false, error: err };
    }
  }

  async delete(id) {
    try {
      console.log(`DELETE FROM public."User" WHERE id = ${id}`);
      await db.any(
        'DELETE FROM public."Block" WHERE "blockedUser" = $1 OR "blockingUser" = $1 ',
        [id],
      );
      await db.any(
        'DELETE FROM public."Like" WHERE "likedUser" = $1 OR "likingUser" = $1 ',
        [id],
      );
      await db.any(
        'DELETE FROM public."Match" WHERE "user1" = $1 OR "user2" = $1 ',
        [id],
      );
      await db.any('DELETE FROM public."Message" WHERE "author" = $1', [id]);
      await db.any(
        'DELETE FROM public."Notification" WHERE "recipient" = $1 OR "sender" = $1',
        [id],
      );
      await db.any(
        'DELETE FROM public."Report" WHERE "reportedUser" = $1 OR "reportingUser" = $1',
        [id],
      );
      await db.any('DELETE FROM public."UserValidation" WHERE "userId" = $1', [
        id,
      ]);
      await db.any(
        'DELETE FROM public."Visit" WHERE visitor = $1 OR visited = $1 ',
        [id],
      );
      await db.any('DELETE FROM public."User" WHERE id = $1 ', [id]);
      return { deleted: true };
    } catch (err) {
      console.log(err, 'in model User.delete()');
      return { deleted: false, error: err };
    }
  }
}

module.exports = User;
