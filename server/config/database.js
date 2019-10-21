const pgp = require('pg-promise')({
    // Initialization Options
})

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'matcha',
    user: 'yann',
    password: 'Bbu4juillet',
    currentSchema: 'public'
};

const db = pgp(cn);

module.exports = db


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