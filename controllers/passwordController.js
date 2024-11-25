const crypto = require('crypto');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const { sendEmail } = require('../services/emailService');

// Đường dẫn tới file user.json
const usersFilePath = path.join(__dirname, '..', 'models', 'users.json');

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
 * Ghi danh sách người dùng vào file user.json
 */
const writeUsers = (users) => {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
        console.error('Không thể lưu file người dùng:', error);
    }
};

/**
 * Hiển thị form quên mật khẩu
 */
const renderForgotPasswordPage = (req, res) => {
    res.render('forgotPassword'); // Render file views/forgotPassword.ejs
};

/**
 * Xử lý quên mật khẩu
 */
const handleForgotPassword = async (req, res) => {
    const { email } = req.body;

     // Đọc danh sách người dùng từ file
     const users = readUsers();

     const user = users.find(u => u.email === email);

    // Kiểm tra nhập liệu
    if (!email || !email.trim()) {
        return res.status(400).render('errorForgotPassword', { message: 'Email không được để trống' });
    }
    
    // Kiểm tra nếu email không tồn tại
    if (!user) {
        return res.status(400).render('errorForgotPassword', { message: 'Email không tồn tại' });
    }

    try {
        // Tạo token khôi phục mật khẩu
        const token = crypto.randomBytes(32).toString('hex');
        user.token = token;
        user.tokenExpiry = Date.now() + 600000; // Token hiệu lực 10 phút (600000 ms)

        // Lưu danh sách người dùng vào file
        writeUsers(users);

        const resetLink = `http://localhost:3000/resetPassword?token=${token}`;

        // Gửi email
        const previewUrl = await sendEmail(
            email,
            'Đặt lại mật khẩu',
            `Nhấn vào liên kết sau để đặt lại mật khẩu của bạn: ${resetLink}`
        );

        res.render('successForgotPassword', {
            message: 'Email khôi phục đã được gửi. Kiểm tra hộp thư của bạn.',
            previewUrl // Trả về URL để xem email trên Ethereal (chỉ dùng thử nghiệm)
        });
    } catch (error) {
        console.log('Error sending email:', error);  // In lỗi để kiểm tra chi tiết
        res.status(500).render('errorForgotPassword', { message: 'Không thể gửi email. Vui lòng nhập lại', error: error.message });
    }
};

/**
 * Hiển thị form reset mật khẩu
 */
const renderResetPasswordPage = (req, res) => {
    const token = req.query.token;

    // Đọc danh sách người dùng từ file
    const users = readUsers();

    // Kiểm tra token hợp lệ, nếu không có hoặc hết hạn, trả lỗi
    const user = users.find(u => u.token === token && u.tokenExpiry > Date.now());
    if (!user) {
        return res.status(400).render('resetPassword', { error: 'Token không hợp lệ hoặc đã hết hạn' });
    }

    // Render trang reset password với token hợp lệ
    res.render('resetPassword', { token });
};

/**
 * Xử lý reset mật khẩu
 */
const handleResetPassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    const token = req.query.token; // Lấy token từ URL

    // Kiểm tra nếu mật khẩu và xác nhận mật khẩu không khớp
    if (newPassword !== confirmPassword) {
        return res.status(400).render('resetPassword', { error: 'Mật khẩu và xác nhận mật khẩu không khớp' });
    }

     // Đọc danh sách người dùng từ file
     const users = readUsers();

    // Tìm người dùng dựa trên token (ví dụ)
    const user = users.find(u => u.token === token && u.tokenExpiry > Date.now());

    if (!user) {
        return res.status(400).render('resetPassword', { error: 'Token không hợp lệ hoặc đã hết hạn' });
    }

    try {
        // Mã hóa mật khẩu mới và lưu vào cơ sở dữ liệu
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword; // Cập nhật mật khẩu người dùng

        // Reset token và thời gian hết hạn
        user.token = '';
        user.tokenExpiry = 0;

        // Lưu danh sách người dùng vào file
        writeUsers(users);
        
        // Render lại trang đăng nhập với thông báo thành công
        res.status(200).render('login', { message: 'Mật khẩu đã được thay đổi thành công. Vui lòng đăng nhập.' });
    } catch (error) {
        res.status(500).render('resetPassword', { error: 'Đã có lỗi xảy ra trong quá trình thay đổi mật khẩu.' });
    }
};

module.exports = {
    handleForgotPassword,
    renderForgotPasswordPage,
    handleResetPassword,
    renderResetPasswordPage
};
