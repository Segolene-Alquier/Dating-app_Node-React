const express = require('express');
const { checkToken } = require('../../middleware/jwt');

const router = express.Router();
const {
  getMatchsFromCurrentUser,
  getMessagesFromMatchId,
  numberOfUnreadMessages,
} = require('./controller');

// list of all Matchs from current user - Chat
router.get('/', checkToken, getMatchsFromCurrentUser);
// get number of unread messages by user id - Chat
router.get('/total', checkToken, numberOfUnreadMessages);
// get all messages by match id - Chat
router.get('/:id', checkToken, getMessagesFromMatchId);

module.exports = router;
