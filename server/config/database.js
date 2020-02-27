const pgp = require('pg-promise')({
  // Initialization Options
});

let cn;
if (process.env.ENVIRONMENT === 'production' && process.env.DATABASE_URL) {
  cn = process.env.DATABASE_URL;
} else {
  cn = {
    host: process.env.DB_HOST,
    port: 5432,
    database: 'matcha',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    currentSchema: 'public',
  };
}
const db = pgp(cn);

module.exports = { db, pgp };
