const express = require('express');
const { checkToken } = require('../../middleware/jwt');

const router = express.Router();
const {
  // getLikesFromCurrentUser,
  blockUnblockUserId,
} = require('./controller');

// get the list of blocked users from the current user
// router.get('/', checkToken, getLikesFromCurrentUser);
router.post('/block-unblock/:id', checkToken, blockUnblockUserId);
module.exports = router;
