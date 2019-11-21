const express = require('express');

const router = express.Router();
const { uploadImage } = require('./controller');

// Upload an image
router.post('/upload', uploadImage);

module.exports = router;
