require('dotenv').config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // ✅ ép kiểu string
  database: process.env.DB_NAME,
});


// Kiểm tra kết nối
const connectDB = async () => {

  try {
    const client = await pool.connect();
    console.log("✅ Kết nối đến PostgreSQL thành công!");
    client.release(); // Giải phóng kết nối
  } catch (err) {
    console.error("❌ Lỗi kết nối PostgreSQL:", err.message);
  }
};

connectDB(); // Gọi hàm kiểm tra kết nối ngay khi khởi động

module.exports = pool; // ❌ KHÔNG bọc trong `{}` vì pool không phải object chứa nhiều properties
