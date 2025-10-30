const db = require('../config/database');

const getAllHuyen = async () => {
  try {
    const result = await db.query(`SELECT h.*, t.ten_tinh, t.quoc_gia FROM "huyen" h JOIN tinh t ON h.ma_tinh = t.ma_tinh `);
    return result.rows; // Trả về danh sách tất cả các huyện
  } catch (error) {
    console.error("lỗi lấy tất cả huyện:", error);
    throw new Error("Database error");
  }
}

const getPaginationHuyen = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const result = await db.query(`SELECT h.*, t.ten_tinh, t.quoc_gia 
      FROM "huyen" h JOIN tinh t ON h.ma_tinh = t.ma_tinh LIMIT $1 OFFSET $2`,
      [limit, offset]);

    const countResult = await db.query(`SELECT COUNT(*) FROM "huyen"`);
    const totalRecords = parseInt(countResult.rows[0].count, 10);
    return {
      data: result.rows,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page
    };
  } catch (error) {
    console.error("lỗi phân trang huyện:", error);
    throw new Error("Database error");
  }
};

const searchHuyen = async (query, page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const keyword = `%${query}%`;
    const countResult = await db.query(`
      SELECT COUNT(*) FROM "huyen" h
      JOIN tinh t ON h.ma_tinh = t.ma_tinh
      WHERE 
      CAST (h.ma_huyen AS TEXT) ILIKE $1 OR
      h.ten_huyen ILIKE $1 OR
      h.cap_hanh_chinh ILIKE $1 OR
      h.mo_ta ILIKE $1 OR
      CAST (h.ma_tinh AS TEXT) ILIKE $1 OR
      CAST (h.dan_so AS TEXT) ILIKE $1 OR
      CAST (h.dien_tich AS TEXT) ILIKE $1 OR
      t.ten_tinh ILIKE $1 OR
      t.quoc_gia ILIKE $1

    `, [keyword]);

    const totalRecords = parseInt(countResult.rows[0].count, 10);
    const result = await db.query(`
      SELECT h.*, t.ten_tinh, t.quoc_gia FROM "huyen" h
      JOIN tinh t ON h.ma_tinh = t.ma_tinh
      WHERE
      CAST (h.ma_huyen AS TEXT) ILIKE $1 OR
      h.ten_huyen ILIKE $1 OR
      h.cap_hanh_chinh ILIKE $1 OR
      h.mo_ta ILIKE $1 OR
      CAST (h.ma_tinh AS TEXT) ILIKE $1 OR
      CAST (h.dan_so AS TEXT) ILIKE $1 OR
      CAST (h.dien_tich AS TEXT) ILIKE $1 OR
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
    console.error("lỗi tìm kiếm huyện:", error);
    throw new Error("Database error");
  }
};

const getHuyenById = async (id) => {
  try {
    const result = await db.query(`SELECT 
    h.*,
    json_agg(json_build_object('duong_dan', hah.duong_dan, 'mo_ta', hah.mo_ta)) AS hinh_anh_huyen
FROM "huyen" h
LEFT JOIN "hinh_anh_huyen" hah ON h.ma_huyen = hah.ma_huyen
WHERE h.id = $1
GROUP BY h.id;
`, [id]);
    if (result.rows.length === 0) {
      throw new Error("District not found");
    }
    console.log("Huyện tìm thấy:", result.rows[0]);
    return result.rows[0]; // Trả về huyện nếu tìm thấy
  } catch (error) {
    console.error("Error fetching district by ID:", error);
    throw new Error("Database error");
  }
};

const updateHuyen = async (id, data) => {
  try {
    const oldHuyen = await getHuyenById(id);

    if (!oldHuyen) {
      throw new Error("");
    }

    const updatedData = {
      ...oldHuyen,
      ...data,
    };
    console.log("Dữ liệu cũ trước khi update:", oldHuyen);
    console.log("Dữ liệu data:", data);
    console.log("Dữ liệu sau khi gộp để update:", updatedData);

    const result = await db.query(
      `UPDATE "huyen" 
      SET 
        ma_huyen = $1,
        ten_huyen = $2,
        cap_hanh_chinh = $3,
        mo_ta = $4,
        ma_tinh = $5,
        dan_so = $6,
        dien_tich = $7
      WHERE id = $8
      RETURNING *`,
      [
        updatedData.ma_huyen,
        updatedData.ten_huyen,
        updatedData.cap_hanh_chinh,
        updatedData.mo_ta,
        updatedData.ma_tinh,
        updatedData.dan_so,
        updatedData.dien_tich,
        id,
      ]
    );

    if (result.rows.length === 0) {
      throw new Error("District not found");
    }

    console.log("Cập nhật huyện thành công:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating district:", error);
    throw new Error("Database error");
  }
};


const deleteHuyen = async (id) => {
  try {
    const result = await db.query(`DELETE FROM "huyen" WHERE id = $1 RETURNING *`, [id]);
    if (result.rows.length === 0) {
      throw new Error("District not found");
    }
    console.log("Xóa huyện thành công:", result.rows[0]);
    return result.rows[0]; // Trả về huyện đã xóa
  } catch (error) {
    console.error("Error deleting district:", error);
    throw new Error("Database error");
  }
};

module.exports = {
  getAllHuyen,
  getPaginationHuyen,
  searchHuyen,
  getHuyenById,
  updateHuyen,
  deleteHuyen
};