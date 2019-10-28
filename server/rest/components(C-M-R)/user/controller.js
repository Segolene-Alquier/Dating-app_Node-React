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
    const { username } = request.body
    if (username === undefined) {
        response.status(206).send("Username is not defined")
        return
    }
    try {
        let call = await user.exists('username', username)
        response.status(200).json({exists: call})
    } 
    catch (err) {
        console.log(err);
        response.status(206).send(err);
    }
}

async function emailExists(request, response) {
    const { email } = request.body
    if (email === undefined) {
        response.status(206).send("Email is not defined")
        return
    }
    try {
        let call = await user.exists('email', email)
        response.status(200).json({exists: call})
    } 
    catch (err) {
        console.log(err);
        response.status(206).send(err);
    }
}

async function createUser(request, response) {
    const { firstname, surname, username, password, email } = request.body
    const errors = await check.createUserErrors(request.body)

    if (errors.length) {
        response.status(201).json({errors: errors})
        return
    }
    try {
        let call = await user.create({firstname, surname, username, password, email})
        response.status(200).json(call)
    } 
    catch (err) {
        console.log(err);
        response.status(206).send(err);
    }
}

async function updateUser(request, response) {
    const id = parseInt(request.params.id)
    const filtered_values = check.filterInputValues("API", request.body)
    const errors = await check.updateUserErrors(request.body)
    if (errors.length) {
        response.status(201).json({errors: errors})
        return
    }
    try {
        let call = await user.updateById(id, filtered_values)
        response.status(200).json(call)
    } 
    catch (err) {
        console.log(err);
        response.status(206).send(err);
    }
}

// const deleteUser = (request, response) => {
//     const id = parseInt(request.params.id)
  
//     pool.query('DELETE FROM public."User" WHERE id = $1', [id], (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`User deleted with ID: ${id}`)
//     })
// }

module.exports.getUsers = getUsers 
module.exports.getUserById = getUserById
module.exports.usernameExists = usernameExists
module.exports.emailExists = emailExists
module.exports.createUser = createUser
module.exports.updateUser = updateUser
// module.exports.deleteUser = deleteUser