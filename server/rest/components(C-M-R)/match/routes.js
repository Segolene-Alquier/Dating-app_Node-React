const express = require('express');
const { checkToken } = require('../../middleware/jwt');
const router = express.Router();
const { getMatchsFromCurrentUser, getMatchById } = require('./controller');

// list of all Matchs from current user - Match
router.get('/', checkToken, getMatchsFromCurrentUser);
// get Match by id - Match
router.get('/:id', getMatchById);

module.exports = router;
