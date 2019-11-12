const { db } = require('../../../config/database');

class Interest {
  isValidType(type) {
    const authorizedTypes = ['id', 'name'];
    return authorizedTypes.some(authorizedType => {
      return type === authorizedType;
    });
  }

  async getBy(type, value) {
    try {
      if (!this.isValidType(type)) {
        console.log(`Interest.getBy(): ${type} is not an authorized type`);
        return null;
      }
      console.log(`SELECT * FROM public."Interest" WHERE ${type} = ${value}`);
      const result = await db.any(
        `SELECT * FROM public."Interest" WHERE $1:name = $2`,
        [type, value],
      );
      return result;
    } catch (err) {
      console.log(err, 'in model Interest.getBy()');
      return null;
    }
  }

  async getAll() {
    try {
      console.log('SELECT * FROM public."Interest"');
      const result = await db.any('SELECT * FROM public."Interest"');
      return result;
    } catch (err) {
      console.log(err, 'in model Interest.getAll()');
      return null;
    }
  }

  async exists(type, value) {
    try {
      if (!value) return false;
      if (!this.isValidType(type)) {
        console.log(`Interest.exists(): ${type} is not an authorized type`);
        return null;
      }
      console.log(
        `SELECT exists(SELECT from public."Interest" WHERE ${type} = ${value})`,
      );
      const result = await db.none(
        `SELECT exists(SELECT from public."Interest" WHERE id = ALL($2));`,
        [value],
      );
      return result[0].exists;
    } catch (err) {
      console.log(err, 'in model Interest.exists()');
      return null;
    }
  }
}

module.exports = Interest;
