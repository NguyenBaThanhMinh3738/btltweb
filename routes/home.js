const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Route cho trang chủ sau khi đăng nhập
router.get('/home', homeController.getHomePage);

module.exports = router;
