const express = require('express');
const { checkToken } = require('../../middleware/jwt');

const router = express.Router();
const { uploadImage, deleteImage } = require('./controller');

// Upload an image
router.post('/upload', checkToken, uploadImage);
router.post('/delete', checkToken, deleteImage);

module.exports = router;
