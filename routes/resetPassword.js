const express = require('express');
const { handleResetPassword } = require('../controllers/passwordController'); // Import controller

const router = express.Router();

// Route xử lý việc đặt lại mật khẩu
router.post('/', handleResetPassword);

module.exports = router;
