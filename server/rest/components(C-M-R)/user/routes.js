const express = require('express');
const router = express.Router()
const db = require('./model');

// list of all users - user
router.get('/', db.getUsers)
// get user by id - user
router.get('/:id', db.getUserById)
// create user - user
router.post('/', db.createUser)
// update user - user
// router.put('/user/:id', db.updateUser)
// delete user - user
router.delete('/:id', db.deleteUser)

module.exports = router