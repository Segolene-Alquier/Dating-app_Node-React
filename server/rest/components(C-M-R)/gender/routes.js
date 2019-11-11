const express = require('express');

const router = express.Router();
const { getGenders, getGenderById } = require('./controller');

// list of all Genders - Gender
router.get('/', getGenders);
// get Gender by id - Gender
router.get('/:id', getGenderById);

module.exports = router;
