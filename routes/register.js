const express = require('express');
const { renderRegisterPage, handleRegister } = require('../controllers/registerController'); // Import controller functions

const router = express.Router();

// Route GET để hiển thị form đăng ký
router.get('/', renderRegisterPage);

// Route POST để xử lý đăng ký
router.post('/', handleRegister);

module.exports = router;
