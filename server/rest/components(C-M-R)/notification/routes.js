const express = require('express');
const { checkToken } = require('../../middleware/jwt');

const router = express.Router();
const { getNotificationsFromCurrentUser } = require('./controller');

// get the list of Notification from the current user
router.get('/', checkToken, getNotificationsFromCurrentUser);

module.exports = router;
