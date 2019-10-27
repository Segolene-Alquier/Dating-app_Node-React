const express = require('express');
const router = express.Router()
const { getInterests, getInterestById } = require("./controller")

// list of all Interests - Interest
router.get('/', getInterests)
// get Interest by id - Interest
router.get('/:id', getInterestById)

module.exports = router