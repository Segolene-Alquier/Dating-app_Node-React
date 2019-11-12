const pgp = require('pg-promise')({
  // Initialization Options
});

const { user, password } = require('./db-log');

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'matcha',
  user,
  password,
  currentSchema: 'public',
};

const db = pgp(cn);

module.exports = { db, pgp };

// const Pool = require('pg').Pool
// const pool = new Pool({
//     user: 'yann',
//     host: 'localhost',
//     database: 'matcha',
//     password: 'Bbu4juillet',
//     currentSchema: 'public',
//     port: 5432
// })

// module.exports = pool
