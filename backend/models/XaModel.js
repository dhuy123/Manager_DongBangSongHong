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

const getPaginationXa = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const result = await db.query( `SELECT t.ten_tinh, t.quoc_gia, h.ten_huyen, x.* FROM "xa" x 
      JOIN huyen h ON x.ma_huyen = h.ma_huyen
      JOIN tinh t ON h.ma_tinh = t.ma_tinh
      LIMIT $1 OFFSET $2`,
      [limit, offset]);
    const countResult = await db.query(`SELECT COUNT(*) FROM "xa"`);
    const totalRecords = parseInt(countResult.rows[0].count, 10);
    return {
      data: result.rows,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page
    };
  } catch (error) {
    console.error("lỗi phân trang xã:", error);
    throw new Error("Database error");
  }
};

const searchXa = async (query, page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const keyword = `%${query}%`;
    const countResult = await db.query(`
      SELECT COUNT(*) FROM "xa" x
      JOIN huyen h ON x.ma_huyen = h.ma_huyen
      JOIN tinh t ON h.ma_tinh = t.ma_tinh
      WHERE 
      CAST (x.ma_xa AS TEXT) ILIKE $1 OR
      x.ten_xa ILIKE $1 OR
      x.cap_hanh_chinh ILIKE $1 OR
      x.mo_ta ILIKE $1 OR
      CAST (x.ma_huyen AS TEXT) ILIKE $1 OR
      h.ten_huyen ILIKE $1 OR
      t.ten_tinh ILIKE $1 OR
      t.quoc_gia ILIKE $1
    `, [keyword]);
    const totalRecords = parseInt(countResult.rows[0].count, 10);
    const result = await db.query(`
      SELECT t.ten_tinh, t.quoc_gia, h.ten_huyen, x.* FROM "xa" x
      JOIN huyen h ON x.ma_huyen = h.ma_huyen
      JOIN tinh t ON h.ma_tinh = t.ma_tinh
      WHERE 
      CAST (x.ma_xa AS TEXT) ILIKE $1 OR
      x.ten_xa ILIKE $1 OR
      x.cap_hanh_chinh ILIKE $1 OR
      x.mo_ta ILIKE $1 OR
      CAST (x.ma_huyen AS TEXT) ILIKE $1 OR
      h.ten_huyen ILIKE $1 OR
      t.ten_tinh ILIKE $1 OR
      t.quoc_gia ILIKE $1
      LIMIT $2 OFFSET $3
    `, [keyword, limit, offset]);
    return {
      data: result.rows,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page
    };
  } catch (error) {
    console.error("lỗi tìm kiếm xã:", error);
    throw new Error("Database error");
  }
};

const getXaById = async (id) => {
  try {
    const result = await db.query(`SELECT t.ten_tinh, t.quoc_gia, h.ten_huyen, x.* FROM "xa" x 
      JOIN huyen h ON x.ma_huyen = h.ma_huyen
      JOIN tinh t ON h.ma_tinh = t.ma_tinh WHERE x.id = $1`, [id]);
    if (result.rows.length === 0) {
      throw new Error("Province image not found");
    }
    console.log("xã tìm thấy:", result.rows[0]);
    return result.rows[0]; 
  } catch (error) {
    console.error("Error fetching province image by ID:", error);
    throw new Error("Database error");
  }
}

const updateXa = async (id, data) => {
  try {
    const oldXa = await getXaById(id);
    if (!oldXa) {
      throw new Error("không có dữ liệu cũ");
  }
  const updateData ={
    ...oldXa,
    ...data,
  }
    const result = await db.query(`
      UPDATE "xa" 
      SET ma_xa = $1,
          ten_xa = $2,
          cap_hanh_chinh = $3,
          mo_ta = $4,
          ma_huyen = $5
          ma_tinh = $6
          dan_so = $7
          dien_tich = $8
      WHERE id = $9
      RETURNING *`,
      [
        updateData.ma_xa,
        updateData.ten_xa,
        updateData.cap_hanh_chinh,
        updateData.mo_ta,   
        updateData.ma_huyen,
        updateData.ma_tinh,
        updateData.dan_so,
        updateData.dien_tich,
        id
      ]
    );
    if (result.rows.length === 0) {
      throw new Error("District not found");
    }

    console.log("Cập nhật huyện thành công:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating province image:", error);
    throw new Error("Database error");
  }
};

const deleteXa = async (id) => {
  try {
    const result = await db.query(`DELETE FROM "xa" WHERE id = $1 RETURNING *`, [id]);
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
  // getAllImgXa,
  getPaginationXa,
  searchXa,    
  getXaById,
  updateXa,
  deleteXa
};


