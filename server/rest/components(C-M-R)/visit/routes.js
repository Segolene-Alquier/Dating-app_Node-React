const express = require('express');

const router = express.Router();
const { getVisits, getVisitById } = require('./controller');

// list of all Visits - Visit
router.get('/', getVisits);
// get Visit by id - Visit
router.get('/:id', getVisitById);

module.exports = router;
