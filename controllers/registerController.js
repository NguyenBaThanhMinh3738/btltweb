const bcrypt = require('bcrypt');
const fs = require('fs'); //File System
const path = require('path');

// Đường dẫn tới file user.js hoặc một file json để lưu trữ người dùng
const usersFilePath = path.join(__dirname, '..', 'models', 'users.json');

// Đọc dữ liệu người dùng từ file user.json
const readUsers = () => {
    try {
      const data = fs.readFileSync(usersFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Không thể đọc file:', error);
      return [];
    }
  };
  
  // Ghi dữ liệu người dùng vào file user.json
  const writeUsers = (users) => {
    try {
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2)); // Ghi lại vào file
    } catch (error) {
      console.error('Không thể ghi vào file:', error);
    }
  };

/**
 * Hiển thị form đăng ký.
 */
const renderRegisterPage = (req, res) => {
    res.render('register'); // Render file views/register.ejs
};

/**
 * Xử lý đăng ký tài khoản mới cho người dùng.
 */
const handleRegister = async (req, res) => {
    const { username, email, password } = req.body;

    // Đọc danh sách người dùng từ tệp JSON
    let users = readUsers();

    // Kiểm tra danh sách người dùng trong console trước khi lưu vào tệp
    console.log('danh sách người dùng trong console trước khi lưu vào tệp', users); 

    // Kiểm tra nếu thiếu email hoặc mật khẩu
    if (!email || !password) {
        return res.status(400).render('errorRegister', { error: 'Email và mật khẩu là bắt buộc' });
    }

    // Kiểm tra nếu email đã tồn tại
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).render('errorRegister', { error: 'Email đã tồn tại' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Nếu chưa tồn tại, thêm người dùng mới vào mảng
    const newUser = { username, email, password: hashedPassword };

    // Thêm người dùng vào danh sách
    users.push(newUser);

     // Lưu lại danh sách người dùng vào file user.js
     writeUsers(users);

      // Kiểm tra danh sách người dùng trong console sau khi lưu vào tệp
    console.log('danh sách người dùng trong console sau khi lưu vào tệp', users);

    // Render giao diện thành công
    res.render('successRegister', { message: 'Đăng ký thành công!', email: newUser.email });
};

module.exports = {
    renderRegisterPage,
    handleRegister
};
