const express = require('express');
const router = express.Router()
// const db = require('./controller');
const { getUserById, getUsers, usernameExists, emailExists } = require("./controller")

// list of all users - user
router.get('/', getUsers)
// get user by id - user
router.get('/:id', getUserById)
// username already exists ? - user
router.get('/username_verification/:username', usernameExists)
// email already exists ? - user
router.get('/email_verification/:email', emailExists)
// create user - user
// router.post('/', createUser)
// update user - user
// router.put('/user/:id', db.updateUser)
// delete user - user
// router.delete('/:id', deleteUser)

module.exports = router