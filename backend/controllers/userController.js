const userModel = require('../models/userModel');

const login = async (req, res) => {
  const { tai_khoan, mat_khau } = req.body;

  try {
    const user = await userModel.login(tai_khoan, mat_khau);
    if (!user) {
      return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });
    }
    res.status(200).json({ message: 'Đăng nhập thành công', user });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
  }
};

module.exports = {
  login,
};
