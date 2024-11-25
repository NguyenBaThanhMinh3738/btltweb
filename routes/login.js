const express = require('express');
const { renderLoginPage, handleLogin } = require('../controllers/loginController'); // Import các controller

const router = express.Router();

// Hiển thị form đăng nhập
router.get('/', renderLoginPage);

// Xử lý đăng nhập
router.post('/', handleLogin);

module.exports = router;
