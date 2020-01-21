const express = require('express');
const { checkToken } = require('../../middleware/jwt');

const router = express.Router();
const { reportUserId } = require('./controller');

// get the list of blocked users from the current user
// router.get('/', checkToken, getLikesFromCurrentUser);
router.post('/:id', checkToken, reportUserId);
module.exports = router;
