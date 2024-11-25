const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// Đường dẫn tới file user.json
const usersFilePath = path.join(__dirname, '../models/user.json');

/**
 * Đọc danh sách người dùng từ file user.json
 */
const readUsers = () => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Không thể đọc file người dùng:', error);
        return [];
    }
};

/**
 * Hiển thị form đăng nhập.
 */
const renderLoginPage = (req, res) => {
    res.render('login'); // Render file views/login.ejs
};

/**
 * Xử lý đăng nhập.
 */
const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    // Kiểm tra nếu thiếu email hoặc mật khẩu
    if (!email || !password) {
        return res.status(400).render('login', { error: 'Email và mật khẩu là bắt buộc' });
    }

    // Đọc danh sách người dùng từ file
    const users = readUsers();

    // Xác thực người dùng
    const user = users.find(u => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).render('login', { error: 'Email hoặc mật khẩu không đúng' });
    }

    // Đăng nhập thành công
    res.render('home', { user }); // Render giao diện home với thông tin người dùng
};

module.exports = {
    renderLoginPage,
    handleLogin
};
