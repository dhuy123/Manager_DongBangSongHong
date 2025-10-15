const db = require("../config/database");

const login = async (tai_khoan, mat_khau) => {
  // Kiểm tra đầu vào
  if (!tai_khoan || !mat_khau) {
    throw new Error("Tên người dùng và mật khẩu không được để trống");
  }

  try {
    const result = await db.query(
      `SELECT * FROM "user" WHERE tai_khoan = $1 AND mat_khau = $2`,
      [tai_khoan, mat_khau]
    );

    if (result.rows.length === 0) {
      throw new Error("Tên người dùng hoặc mật khẩu không đúng");
    }
   // console.log("dữ liệu đăng nhập thành công", result.rows[0]);
    return result.rows[0]; // Trả về người dùng nếu tìm thấy
   
  } catch (error) {
   console.error("Login error:", error);
    return { success: false, message: "Database error" };
  }
};

module.exports = { login };