const express = require('express');
const router = express.Router()
const { login, logout } = require("./controller")

// login user
router.post('/login', login)

// logout user
router.post('/logout', logout)

module.exports = router