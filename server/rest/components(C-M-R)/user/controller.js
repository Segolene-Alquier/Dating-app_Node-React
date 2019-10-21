const UserValidation = require("./utils");
const User = require("./model")
const user = new User();
const check = new UserValidation(user);

async function getUsers(request, response) {
    try {
        let call = await user.getAll()
        response.status(200).json(call)
    } 
    catch (err) {
        console.log(err);
        response.status(206).send(err);
    }
}

async function getUserById(request, response) {
    const id = parseInt(request.params.id)
    try {
        let call = await user.getBy('id', id)
        response.status(200).json(call)
    } 
    catch (err) {
        console.log(err);
        response.status(206).send(err);
    }
}

async function usernameExists(request, response) {
    const username = request.params.username
    try {
        let call = await user.exists('username', username)
        response.status(200).json(call)
    } 
    catch (err) {
        console.log(err);
        response.status(206).send(err);
    }
}

async function emailExists(request, response) {
    const email = request.params.email
    try {
        let call = await user.exists('email', email)
        response.status(200).json(call)
    } 
    catch (err) {
        console.log(err);
        response.status(206).send(err);
    }
}


// const createUser = (request, response) => {
//     const { firstname, surname, username, password, email } = request.body
    
//     // console.log(check.isEmail(email))
//     // console.log(check.isAlphaNum(username))
//     // console.log(check.passwordFormat(password))
//     console.log(check.rightLength(username, 2, 10))

//     pool.query('INSERT INTO public."User" (firstname, surname, username, password, email) VALUES ($1, $2, $3, $4, $5)', [firstname, surname, username, password, email], (error, results) => {
//       if (error) { // proteger en cas d'erreur
//         throw error
//         response.status(201).send(JSON.stringify({created: false}))
//       }
//       response.status(201).send(JSON.stringify({created: true}))
//     })
// }

// // const updateUser = (request, response) => {
// //     const id = parseInt(request.params.id)
// //     const { name, email } = request.body
  
// //     pool.query(
// //       'UPDATE users SET name = $1, email = $2 WHERE id = $3',
// //       [name, email, id],
// //       (error, results) => {
// //         if (error) {
// //           throw error
// //         }
// //         response.status(200).send(`User modified with ID: ${id}`)
// //       }
// //     )
// // }

// const deleteUser = (request, response) => {
//     const id = parseInt(request.params.id)
  
//     pool.query('DELETE FROM public."User" WHERE id = $1', [id], (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`User deleted with ID: ${id}`)
//     })
// }

module.exports = {
    getUsers,
    getUserById,
    usernameExists,
    emailExists,
    // createUser,
    // updateUser,
    // deleteUser,
  }