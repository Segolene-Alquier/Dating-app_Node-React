const express = require('express');
const { checkToken } = require('../../middleware/jwt');

const router = express.Router();
const { getMatchsFromCurrentUser } = require('./controller');

// list of all Matchs from current user - Match
router.get('/', checkToken, getMatchsFromCurrentUser);
// get Match by id - Match
// router.get('/:id', checkToken, getMatchById);

module.exports = router;
