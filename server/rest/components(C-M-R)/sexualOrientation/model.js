const { db } = require('../../../config/database');

class SexualOrientation {
  static isValidType(type) {
    const authorizedTypes = ['id', 'name'];
    return authorizedTypes.some(authorizedType => {
      return type === authorizedType;
    });
  }

  async getBy(type, value) {
    try {
      if (!this.isValidType(type)) {
        console.log(
          `SexualOrientation.getBy(): ${type} is not an authorized type`,
        );
        return null;
      }
      console.log(
        `SELECT * FROM public."SexualOrientation" WHERE ${type} = ${value}`,
      );
      const result = await db.any(
        `SELECT * FROM public."Gender" WHERE $1:name = $2`,
        [type, value],
      );
      return result;
    } catch (err) {
      console.log(err, 'in model Gender.getBy()');
      return null;
    }
  }

  static async getAll() {
    try {
      console.log('SELECT * FROM public."Gender"');
      const result = await db.any('SELECT * FROM public."Gender"');
      return result;
    } catch (err) {
      console.log(err, 'in model Gender.getAll()');
      return null;
    }
  }

  async exists(type, value) {
    try {
      if (!value) return false;
      if (!this.isValidType(type)) {
        console.log(`Gender.exists(): ${type} is not an authorized type`);
        return null;
      }
      console.log(
        `SELECT exists(SELECT from public."Gender" WHERE ${type} = ${value})`,
      );
      const result = await db.any(
        `SELECT exists(SELECT from public."Gender" WHERE $1:name = $2);`,
        [type, value],
      );
      return result[0].exists;
    } catch (err) {
      console.log(err, 'in model Gender.exists()');
      return null;
    }
  }
}

module.exports = SexualOrientation;
