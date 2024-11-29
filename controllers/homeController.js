const path = require('path');

exports.getHomePage = (req, res) => {
    // Kiểm tra session để đảm bảo người dùng đã đăng nhập
    if (req.session.user) {
        // Render trang chủ nếu người dùng đã đăng nhập
        res.render(path.join(__dirname, '../../frontend/views', 'index'));
    } else {
        // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
        res.redirect('/auth/login');
    }
};
