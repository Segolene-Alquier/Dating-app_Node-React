const express = require('express');
const router = express.Router()
// const db = require('./controller');
const { getUserById } = require("./controller")

// list of all users - user
// router.get('/', getUsers)
// get user by id - user
router.get('/:id', getUserById)
// create user - user
// router.post('/', createUser)
// update user - user
// router.put('/user/:id', db.updateUser)
// delete user - user
// router.delete('/:id', deleteUser)

module.exports = router