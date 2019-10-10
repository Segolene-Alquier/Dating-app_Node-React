const Pool = require('pg').Pool
const pool = new Pool({
    user: 'yann',
    host: 'localhost',
    database: 'matcha',
    password: 'Bbu4juillet',
    currentSchema: 'public',
    port: 5432
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM public."User"', (error, results) => {
        if (error)
            throw error
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM public."User" WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { firstname, surname, username, password, email } = request.body
    console.log(request.body)
  
    pool.query('INSERT INTO public."User" (firstname, surname, username, password, email) VALUES ($1, $2, $3, $4, $5)', [firstname, surname, username, password, email], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results)
      response.status(201).send(`User added`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    // updateUser,
    // deleteUser,
  }