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
const getPaginationTinh = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    // Lấy dữ liệu phân trang
    const dataResult = await db.query(
      `SELECT * FROM "tinh"
       ORDER BY ten_tinh
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    // Lấy tổng số bản ghi để tính totalPages
    const countResult = await db.query(`SELECT COUNT(*) FROM "tinh"`);
    const totalRecords = parseInt(countResult.rows[0].count, 10);

    return {
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
      totalRecords,
      data: dataResult.rows
    };
  } catch (error) {
    console.error("Error fetching paginated provinces:", error);
    throw new Error("Database error");
  }
};

const searchTinh = async (query, page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const keyword = `%${query}%`;
    console.log("Từ khóa tìm kiếm trong model:", keyword);
    console.log("Page:", page, "Limit:", limit, "Offset:", offset);

    const countResult = await db.query(`
      SELECT COUNT(*) FROM "tinh"
      WHERE 
        CAST(ma_tinh AS TEXT) ILIKE $1 OR
        ten_tinh ILIKE $1 OR
        quoc_gia ILIKE $1 OR
        cap_hanh_chinh ILIKE $1 OR
        CAST(dan_so AS TEXT) ILIKE $1 OR
        CAST(dien_tich AS TEXT) ILIKE $1
    `, [keyword]);
    const totalRecords = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalRecords / limit);

    const dataPage = await db.query(`
      SELECT * FROM "tinh"
      WHERE
        CAST(ma_tinh AS TEXT) ILIKE $1 OR
        ten_tinh ILIKE $1 OR
        quoc_gia ILIKE $1 OR
        cap_hanh_chinh ILIKE $1 OR
        CAST(dan_so AS TEXT) ILIKE $1 OR
        CAST(dien_tich AS TEXT) ILIKE $1
      ORDER BY ten_tinh
      LIMIT $2 OFFSET $3
    `, [keyword, limit, offset]);

    return {
      currentPage: page,
      totalPages,
      totalRecords,
      data: dataPage.rows
    };
  } catch (error) {
    console.error("Lỗi khi tìm kiếm :", error);
    throw new Error("Database error");
  }
};

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
    // 1️⃣ Lấy dữ liệu cũ
    const oldResult = await db.query(`
      SELECT 
        t.*,
        json_agg(json_build_object('duong_dan', hat.duong_dan, 'mo_ta', hat.mo_ta)) AS hinh_anh_tinh  
      FROM "tinh" t
      LEFT JOIN "hinh_anh_tinh" hat ON t.ma_tinh = hat.ma_tinh
      WHERE t.id = $1
      GROUP BY t.id
    `, [id]);

    if (oldResult.rows.length === 0) {
      throw new Error("Province not found");
    }

    const oldData = oldResult.rows[0];
    console.log("📋 Dữ liệu cũ trước khi update:", oldData);

    // 2️⃣ Partial update: nếu không gửi field thì dùng dữ liệu cũ
    const quoc_gia = data.quoc_gia ?? oldData.quoc_gia;
    const ten_tinh = data.ten_tinh ?? oldData.ten_tinh;
    const cap_hanh_chinh = data.cap_hanh_chinh ?? oldData.cap_hanh_chinh;
    const ma_tinh = data.ma_tinh ?? oldData.ma_tinh;
    const dien_tich = data.dien_tich ?? oldData.dien_tich;
    const dan_so = data.dan_so ?? oldData.dan_so;
    const mo_ta = data.mo_ta ?? oldData.mo_ta;

    // 3️⃣ Update
    const result = await db.query(
      `UPDATE "tinh" 
       SET quoc_gia=$1, ten_tinh=$2, cap_hanh_chinh=$3, ma_tinh=$4, dien_tich=$5, dan_so=$6, mo_ta=$7
       WHERE id=$8
       RETURNING *`,
      [quoc_gia, ten_tinh, cap_hanh_chinh, ma_tinh, dien_tich, dan_so, mo_ta, id]
    );

    console.log("✅ Cập nhật tỉnh thành công:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("❌ Chi tiết lỗi SQL:", error.message);
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
  deleteTinh,
  getPaginationTinh,
  searchTinh
}