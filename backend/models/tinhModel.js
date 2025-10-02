const db = require("../config/database");

const getAllTinh = async () => {
  try {
    const result = await db.query(`SELECT * FROM "tinh"`);
    return result.rows; 
  } catch (error) {
    console.error("Error fetching all provinces:", error);
    throw new Error("Database error");
  }
}

const getTinhById = async (id) => {
  try {
    const result = await db.query(`
      SELECT 
        t.*,
        json_agg(json_build_object('duong_dan', hat.duong_dan, 'mo_ta', hat.mo_ta)) AS hinh_anh_tinh  
      FROM "tinh" t
      LEFT JOIN "hinh_anh_tinh" hat ON t.ma_tinh = hat.ma_tinh
      WHERE t.id = $1
      GROUP BY t.id
    `, [id]);

    if (result.rows.length === 0) {
      throw new Error("Province not found");
    }

    console.log("Tỉnh và ảnh:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching province by ID:", error);
    throw new Error("Database error");
  }
};

const updateTinh = async (id, data) => {
  try {
    const result = await db.query(
      `UPDATE "tinh" 
       SET 
         quoc_gia = $1,
         ten_tinh = $2,
         cap_hanh_chinh = $3,
         ma_tinh = $4,
         dien_tich = $5,
         dan_so = $6,
         mo_ta = $7
       WHERE id = $8
       RETURNING *`,
      [
        data.quoc_gia,
        data.ten_tinh,
        data.cap_hanh_chinh,
        data.ma_tinh,
        data.dien_tich,
        data.dan_so,
        data.mo_ta,
        id
      ]
    );

    if (result.rows.length === 0) {
      throw new Error("Province not found");
    }
console.log("Cập nhật tỉnh thành công:", result.rows[0]);
    return result.rows[0]; // Trả về tỉnh đã cập nhật
  } catch (error) {
    console.error("❌ Chi tiết lỗi SQL:", error.message);
    console.error("Error updating province:", error);
    throw new Error("Database error");
  }
};

const deleteTinh = async (id) => {
  try {
    const result = await db.query(`DELETE FROM "tinh" WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      throw new Error("Province not found");
    }
    console.log("Xóa tỉnh thành công");
    return null; 
  } catch (error) {
    console.error("Error deleting province:", error);
    throw new Error("Database error");
  }
};


module.exports = {
  getAllTinh,
  getTinhById,
  updateTinh,
  deleteTinh
}