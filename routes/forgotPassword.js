const express = require('express');
const { handleForgotPassword, renderForgotPasswordPage} = require('../controllers/passwordController');

const router = express.Router();

/** 
 * Route: GET / forgotPassword
 * Hiển thị form quên mật khẩu  
 */ 
router.get('/', renderForgotPasswordPage);

/**
 * Route: POST /forgotPassword
 * Mô tả: Xử lý yêu cầu quên mật khẩu.
 */
router.post('/', handleForgotPassword);

module.exports = router;
