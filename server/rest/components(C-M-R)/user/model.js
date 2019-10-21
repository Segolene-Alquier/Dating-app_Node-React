const pool = require("../../../config/database");

class User {

  isValidType(type) {
    const authorized_types = ['id', 'email', 'username']
    return authorized_types.some((authorized_type) => {
      return type === authorized_type
    })
  }

  async  getBy(type, value) {
    try {
      let result;
      if (!this.isValidType(type)) {
        console.log(`User.getBy(): ${type} is not an authorized type`);
        return (null);
      }
      console.log(`SELECT * FROM public."User" WHERE ${type} = ${value}`)
      result = await pool.query(`SELECT * FROM public."User" WHERE ${type} = $1`, [value])
      return (result.rows)
    }
    catch (err) {
      console.log(err, "in model User.getBy()");
    }
  }

  async  exists(type, value) {
    try {
      let result;
      if (!value) return false;
      if (!this.isValidType(type)) {
        console.log(`User.exists(): ${type} is not an authorized type`);
        return (null);
      }
      console.log(`SELECT exists(SELECT from public."User" WHERE ${type} = ${value})`)
      result = await pool.query(`SELECT exists(SELECT from public."User" WHERE ${type} = $1);`, [value])
      return (result.rows[0].exists)
    }
    catch (err) {
      console.log(err, "in model User.exists()");
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

  async create({firstname, surname, username, password, email}) {
    try {
      console.log(`INSERT INTO public."User" (firstname, surname, username, password, email) VALUES (${firstname}, ${surname}, ${username}, ${password}, ${email})`)
      await pool.query('INSERT INTO public."User" (firstname, surname, username, password, email) VALUES ($1, $2, $3, $4, $5)', [firstname, surname, username, password, email])      
      return ({created: true})
    }
    catch (err) {
      console.log(err, "in model User.getAll()");
      return ({created: false, error: err})
    }
  }
}

module.exports = User