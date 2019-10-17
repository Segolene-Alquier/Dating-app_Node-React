const pool = require("../../../config/database");

class User {

  // constructor() {
  //   let resultG = {};

  
  // }

async  getById(id) {
    try {
      let result;
      result = await pool.query('SELECT * FROM public."User" WHERE id = $1', [id])
      console.log(result.rows);
      return (result.rows)
    }
    catch (err) {
      console.log(err, "in model findOne");
    }
  }

}

module.exports = User