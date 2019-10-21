const express = require('express');
const router = express.Router()
// const db = require('./controller');
const { getUserById, getUsers, usernameExists, emailExists } = require("./controller")

// list of all users - user
router.get('/', getUsers)
// username already exists ? - user
router.get('/verification/username', usernameExists)
// email already exists ? - user
router.get('/verification/email', emailExists)
// get user by id - user
router.get('/:id', getUserById)
// create user - user
// router.post('/', createUser)
// update user - user
// router.put('/user/:id', db.updateUser)
// delete user - user
// router.delete('/:id', deleteUser)

module.exports = router