const pool = require("../../../config/database");

class User {

  isValidType(type) {
    const authorized_types = ['id', 'email', 'username']
    return authorized_types.some((authorized_type) => {
      return type === authorized_type
    })
  }

  async  getBy(type, id) {
    try {
      let result;
      if (!this.isValidType(type)) {
        console.log(`User.getBy(): ${type} is not an authorized type`);
        return (null);
      }
      console.log(`SELECT * FROM public."User" WHERE ${type} = ${id}`)
      result = await pool.query(`SELECT * FROM public."User" WHERE ${type} = $1`, [id])
      return (result.rows)
    }
    catch (err) {
      console.log(err, "in model User.getBy()");
    }
  }

  async  getAll() {
    try {
      let result;
      console.log('SELECT * FROM public."User"')
      result = await pool.query('SELECT * FROM public."User"')
      return (result.rows)
    }
    catch (err) {
      console.log(err, "in model User.getAll()");
    }
  }
}

module.exports = User