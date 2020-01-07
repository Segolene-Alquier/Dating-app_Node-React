const express = require('express');
const { checkToken } = require('../../middleware/jwt');

const router = express.Router();
const { getVisits, getVisitsFromCurrentUser } = require('./controller');

// get the list of visit from the current user
router.get('/', checkToken, getVisitsFromCurrentUser);
module.exports = router;
