const express = require('express');
const { renderResetPasswordPage, handleResetPassword } = require('../controllers/passwordController'); // Import controller

const router = express.Router();

/** 
 * Route: GET / resetPassword
 * Hiển thị form reset mật khẩu  
 */ 
router.get('/resetPassword', renderResetPasswordPage);


// Route xử lý việc đặt lại mật khẩu
router.post('/resetPassword', handleResetPassword);

module.exports = router;
