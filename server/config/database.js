const pgp = require('pg-promise')({
  // Initialization Options
});

const cn = {
  host: process.env.DB_HOST,
  port: 5432,
  database: 'matcha',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
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
