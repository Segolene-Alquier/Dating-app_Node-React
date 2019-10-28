const {db, pgp} = require("../../../config/database");

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
      result = await db.any(`SELECT * FROM public."User" WHERE $1:name = $2`, [type, value])
      return (result)
    }
    catch (err) {
      console.log(err, "in model User.getBy()");
    }
  }

  async  updateById(id, values) {
    try {
      console.log(values)
      const query = pgp.helpers.update(values,values,`User`) + ' WHERE id = $1';
      console.log(query)
      console.log(db.any(query,[id]))
    }
    catch (err) {
      console.log(err, "in model User.updateById()");
    }
  }

  async  exists(type, value) {
    try {
      let result;
      if (!value) return false;
      // console.log(type)
      if (!this.isValidType(type)) {
        console.log(`User.exists(): ${type} is not an authorized type`);
        return (null);
      }
      console.log(`SELECT exists(SELECT from public."User" WHERE ${type} = ${value})`)
      result = await db.any(`SELECT exists(SELECT from public."User" WHERE $1:name = $2);`, [type, value])
      return (result[0].exists)
    }
    catch (err) {
      console.log(err, "in model User.exists()");
    }
  }

  async  getAll() {
    try {
      let result;
      console.log('SELECT * FROM public."User"')
      result = await db.any('SELECT * FROM public."User"')
      return (result)
    }
    catch (err) {
      console.log(err, "in model User.getAll()");
    }
  }

  async create({firstname, surname, username, password, email}) {
    try {
      console.log(`INSERT INTO public."User" (firstname, surname, username, password, email) VALUES (${firstname}, ${surname}, ${username}, ${password}, ${email})`)
      await db.any('INSERT INTO public."User" (firstname, surname, username, password, email) VALUES ($1, $2, $3, $4, $5)', [firstname, surname, username, password, email])      
      return ({created: true})
    }
    catch (err) {
      console.log(err, "in model User.create()");
      return ({created: false, error: err})
    }
  }

  async delete(id) {
    try {
      console.log(`DELETE FROM public."User" WHERE id = ${id}`)
      await db.any('DELETE FROM public."User" WHERE id = $1 ', [id])      
      return ({deleted: true})
    }
    catch (err) {
      console.log(err, "in model User.delete()");
      return ({deleted: false, error: err})
    }
  }
}

module.exports = User