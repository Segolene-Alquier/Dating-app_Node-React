const Pool = require('pg').Pool
const pool = new Pool({
    user: 'yann',
    host: 'localhost',
    database: 'matcha',
    password: 'Bbu4juillet',
    currentSchema: 'public',
    port: 5432
})

module.exports = pool