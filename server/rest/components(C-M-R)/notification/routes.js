const express = require('express');
const { checkToken } = require('../../middleware/jwt');

const router = express.Router();
const {
  getNotificationsFromCurrentUser,
  numberOfUnreadNotifications,
} = require('./controller');

// get number of notifications unread from the current user
router.get('/total', checkToken, numberOfUnreadNotifications);
// get the list of Notification from the current user
router.get('/', checkToken, getNotificationsFromCurrentUser);

module.exports = router;
