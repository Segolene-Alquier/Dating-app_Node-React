const express = require('express');

const router = express.Router();
const {
  verifyConfirmationToken,
  verifyForgotPasswordToken,
  forgotPassword,
  forgotPasswordUpdate,
} = require('./controller');

// confirm new account with token
router.get('/newaccount/:token', verifyConfirmationToken);
router.get('/forgotpassword/:token', verifyForgotPasswordToken);
router.post('/forgotpasswordcreate', forgotPassword);
router.post('/forgotpasswordupdate/:token', forgotPasswordUpdate);

module.exports = router;
