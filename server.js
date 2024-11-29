// Import thư viện cần thiết
const express = require('express');
const session = require('express-session');
const path = require('path'); // Để xử lý các đường dẫn

const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');

const app = express();
const PORT = process.env.PORT || 3000; // Cổng cho frontend (có thể khác backend)

// Cấu hình session
app.use(session({
  secret: 'your_secret_key',  // Mã bí mật để mã hóa session
  resave: false,  // Không lưu lại session mỗi khi có yêu cầu
  saveUninitialized: true,  // Lưu session ngay cả khi không có thông tin
  cookie: { secure: false }  // Thiết lập cookie, secure = true yêu cầu HTTPS
}));

// Thiết lập view engine là EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Đường dẫn chính xác đến thư mục views

// Cấu hình thư mục public để chứa các tài nguyên như CSS, JS, hình ảnh
app.use(express.static(path.join(__dirname, 'public')));

// Middleware để xử lý dữ liệu từ form và JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// debug url
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// Route cho trang login, register, forgot password, reset password
app.use('/', authRoutes);

// Xử lý route không tồn tại
app.use((req, res) => {
  res.status(404).render('404', { message: 'Trang không tồn tại' }); // Tạo file 404.ejs trong thư mục views
});

// Route cho trang chủ sau khi đăng nhập
app.use('/home', homeRoutes);

// Chạy server trên cổng đã chỉ định
app.listen(PORT, () => {
  console.log(`Frontend server is running at http://localhost:${PORT}`);
});
