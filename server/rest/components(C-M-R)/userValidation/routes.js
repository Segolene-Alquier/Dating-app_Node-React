const express = require('express');

const router = express.Router();
const { verifyConfirmationToken } = require('./controller');

// confirm new account with token
router.get('/newaccount/:token', verifyConfirmationToken);

module.exports = router;
