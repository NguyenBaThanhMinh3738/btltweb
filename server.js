const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const forgotPasswordRoute = require('./routes/forgotPassword');
const resetPasswordRoute = require('./routes/resetPassword');
const aboutUsRoute = require('./routes/aboutUs');

const app = express();
const port = 3000;

// Middleware để parse dữ liệu từ form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware cho session
app.use(session({
    secret: 'yourSecretKey',  // Mã khóa để mã hóa session
    resave: false,
    saveUninitialized: true,
}));

// Middleware xử lý lỗi (nếu có)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Đã xảy ra lỗi!');
});

// Sử dụng EJS để render trang
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Đảm bảo phục vụ các tệp tĩnh (CSS, JS, hình ảnh)
app.use(express.static(path.join(__dirname, 'public')));  // Thư mục chứa index.html và các tệp tĩnh

// debug url
app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});

// Route cho trang đăng nhập
app.use('/login', loginRoute);

// Route cho trang register
app.use('/register', registerRoute);

// Route cho trang forgot password
app.use('/forgotPassword', forgotPasswordRoute);

// Route cho trang reset password
app.use('/resetPassword', resetPasswordRoute);

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
// Route cho about us
app.get('/aboutUs', aboutUsRoute);

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
