const express = require('express');
const router = express.Router()
const { getSexualOrientations, getSexualOrientationById } = require("./controller")

// list of all SexualOrientations - SexualOrientation
router.get('/', getSexualOrientations)
// get SexualOrientation by id - SexualOrientation
router.get('/:id', getSexualOrientationById)

module.exports = router