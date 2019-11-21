const express = require('express');
const { checkToken } = require('../../middleware/jwt');

const router = express.Router();
const { uploadImage } = require('./controller');

// Upload an image
router.post('/upload', checkToken, uploadImage);

module.exports = router;
