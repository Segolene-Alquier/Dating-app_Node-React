const express = require('express');

const router = express.Router();
const { login, logout, booleanToken } = require('./controller');

// login user
router.post('/login', login);

// logout user
router.post('/logout', logout);

// check token
router.get('/checkToken', booleanToken);

module.exports = router;
