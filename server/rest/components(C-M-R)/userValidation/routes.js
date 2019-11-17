const express = require('express');

const router = express.Router();
const { verifyConfirmationToken, forgotPassword } = require('./controller');

// confirm new account with token
router.get('/newaccount/:token', verifyConfirmationToken);
router.post('/forgotpassword', forgotPassword);

module.exports = router;
