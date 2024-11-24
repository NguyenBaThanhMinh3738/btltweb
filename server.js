const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
const port = 3000;

// Middleware để parse dữ liệu từ form
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware cho session
app.use(session({
    secret: 'yourSecretKey',  // Mã khóa để mã hóa session
    resave: false,
    saveUninitialized: true,
}));

// Sử dụng EJS để render trang
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Mảng lưu trữ tài khoản (thực tế, bạn sẽ lấy từ cơ sở dữ liệu)
const users = {
    'user123': 'password123', // Tài khoản mẫu
};

// Đảm bảo phục vụ các tệp tĩnh (CSS, JS, hình ảnh)
app.use(express.static(path.join(__dirname, 'public')));  // Thư mục chứa index.html và các tệp tĩnh

// Route cho trang đăng nhập
app.get('/login', (req, res) => {
    res.render('login');
});

// Route cho trang register
app.get('/register', (req, res) => {
    res.render('register');
});

// Route cho trang forgot password
app.get('/forgot-password', (req, res) => {
    res.render('forgot-password');
});

// Xử lý form đăng nhập
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Kiểm tra thông tin đăng nhập
    if (users[username] && users[username] === password) {
        req.session.user = username;  // Lưu thông tin người dùng vào session
        res.redirect('/home');  // Chuyển hướng đến trang chủ nếu đăng nhập thành công
    } else {
        res.render('login', { error: 'Sai tài khoản hoặc mật khẩu' });  // Hiển thị thông báo lỗi nếu đăng nhập sai
    }
});

// Route cho trang chủ sau khi đăng nhập
app.get('/home', (req, res) => {
    
    // Kiểm tra session để đảm bảo người dùng đã đăng nhập
    if (req.session.user) {
        // Chuyển hướng tới index.html từ thư mục public sau khi đăng nhập thành công
        // res.sendFile(path.join(__dirname, 'public', 'index.ejs'));  // Chuyển hướng đến index.html sau khi đăng nhập
        res.render(path.join(__dirname, 'public', 'index.ejs'))
    } else {
        res.redirect('/login');  // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
    }
});

// Route cho đăng xuất
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Có lỗi khi đăng xuất');
        }
        res.redirect('/login');  // Quay lại trang đăng nhập sau khi đăng xuất
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
