const db = require("../config/database");

// const getAllImgTinh = async () => {
//   try {
//     const result = await db.query(`SELECT * FROM "hinh_anh_tinh"`);
//     return result.rows; // Trả về danh sách tất cả các hình ảnh tỉnh
//   } catch (error) {
//     console.error("Error fetching all province images:", error);
//     throw new Error("Database error");
//   }
// }

const getImgHuyenByMaHuyen = async (ma_huyen) => {
  try {
    const result = await db.query(`SELECT * FROM "hinh_anh_huyen" WHERE ma_huyen = $1`, [ma_huyen]);
    if (result.rows.length === 0) {
      throw new Error("No images found for this district");
    }
    // console.log("Các hình ảnh tỉnh tìm thấy:", result.rows);
    return result.rows; // Trả về tất cả ảnh của huyện
  } catch (error) {
    console.error("Error fetching province images by ma_huyen:", error);
    throw new Error("Database error");
  }
};

const getImgHuyenById = async (id) => {
  try {
    const result = await db.query(`SELECT * FROM "hinh_anh_huyen" WHERE id = $1`, [id]);
    if (result.rows.length === 0) {
      throw new Error("Province image not found");
    }
    console.log("Hình ảnh tỉnh tìm thấy:", result.rows[0]);
    return result.rows[0]; 
  } catch (error) {
    console.error("Error fetching province image by ID:", error);
    throw new Error("Database error");
  }
}

const createImgHuyen = async (data) => {
  try {
    const result = await db.query(
      `INSERT INTO "hinh_anh_huyen" (ma_huyen, duong_dan, mo_ta)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [
        data.ma_huyen,
        data.duong_dan,
        data.mo_ta
      ]
    );
    console.log("Thêm hình ảnh huyen thành công:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("❌ Chi tiết lỗi SQL:", error.message);
    console.error("Error creating huyen image:", error);
    throw new Error("Database error");
  }
};


const updateImgHuyen = async (id, data) => {
  try {
    const result = await db.query(
      `UPDATE "hinh_anh_huyen" 
         SET 
             duong_dan = $1,
             mo_ta = $2
         WHERE id = $3
         RETURNING *`,
      [
        data.duong_dan,
        data.mo_ta,
        id
      ]
    );

    if (result.rows.length === 0) {
      throw new Error("Province image not found");
    }
    console.log("Cập nhật hình ảnh tỉnh thành công:", result.rows[0]);
    return result.rows[0]; // Trả về hình ảnh tỉnh đã cập nhật
  } catch (error) {
    console.error("❌ Chi tiết lỗi SQL:", error.message);
    console.error("Error updating province image:", error);
    throw new Error("Database error");
  }
};

const deleteImgHuyen = async (id) => {
  try {
    const result = await db.query(`DELETE FROM "hinh_anh_huyen" WHERE id = $1 RETURNING *`, [id]);
    if (result.rows.length === 0) {
      throw new Error("Province image not found");
    }
    console.log("Xóa hình ảnh tỉnh thành công:", result.rows[0]);
    return result.rows[0]; // Trả về hình ảnh tỉnh đã xóa
  } catch (error) {
    console.error("Error deleting province image:", error);
    throw new Error("Database error");
  }
}

module.exports = {
  // getAllImgHuyen,    
  getImgHuyenByMaHuyen,
  getImgHuyenById,
  createImgHuyen,
  updateImgHuyen,
  deleteImgHuyen
};


