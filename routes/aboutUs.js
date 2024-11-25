const express = require('express');
const { renderAboutUsPage} = require('../controllers/aboutUsController'); // Import các controller

const router = express.Router();

// Hiển thị form about us
router.get('/', renderAboutUsPage);


module.exports = router;