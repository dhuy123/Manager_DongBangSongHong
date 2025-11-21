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
    t.ten_tinh,
    t.quoc_gia,
    json_agg(json_build_object('duong_dan', hah.duong_dan, 'mo_ta', hah.mo_ta)) AS hinh_anh_huyen
FROM "huyen" h
LEFT JOIN "hinh_anh_huyen" hah ON h.ma_huyen = hah.ma_huyen
LEFT JOIN tinh t ON h.ma_tinh = t.ma_tinh
WHERE h.id = $1
GROUP BY h.id, t.ten_tinh, t.quoc_gia;
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
  console.log("Bắt đầu cập nhật huyện với ID:", id);
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

// Tìm kiếm trả về tất cả kết quả khớp (không phân trang)
const searchHuyenAll = async (query) => {
  try {
    const keyword = `%${query}%`;
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
    `, [keyword]);

    return result.rows;
  } catch (error) {
    console.error("lỗi tìm kiếm huyện (all):", error);
    throw new Error("Database error");
  }
};

const exportGeoJson = async (id) => {
  try {
    const result = await db.query(`
      SELECT jsonb_build_object(
        'type', 'FeatureCollection',
        'features', COALESCE(json_agg(
          jsonb_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(h.geom)::json,
            'properties', jsonb_build_object(
              'id', h.id,
              'ma_huyen', h.ma_huyen,
              'ten_huyen', h.ten_huyen,
              'dan_so', h.dan_so,
              'dien_tich', h.dien_tich,
              'cap_hanh_chinh', h.cap_hanh_chinh,
              'mo_ta', h.mo_ta,
              'ma_tinh', h.ma_tinh,
              'ten_tinh', t.ten_tinh,
              'quoc_gia', t.quoc_gia
            )
          )
        ), '[]'::json)
      ) AS geojson
      FROM "huyen" AS h
      JOIN tinh t ON h.ma_tinh = t.ma_tinh
      WHERE h.id::text ILIKE $1
    `, [id]);
    console.log("Kết quả truy vấn xuất GeoJSON:", result);
    if (!result.rows.length || !result.rows[0].geojson) {
      console.log("Không tìm thấy feature nào cho id:", id);
       return { ten_tinh: null, geojson: { type: "FeatureCollection", features: [] } };
    }

    const { ten_tinh, geojson } = result.rows[0];
    console.log("Tên tỉnh:", ten_tinh);
    console.log("Kết quả xuất GeoJSON:", geojson);

    return { ten_tinh, geojson };
  } catch (error) {
    console.error("lỗi xuất GeoJSON huyện:", error);
    throw new Error("Database error");
  }
};

module.exports = {
  getAllHuyen,
  getPaginationHuyen,
  searchHuyen,
  searchHuyenAll,
  getHuyenById,
  updateHuyen,
  deleteHuyen,
  exportGeoJson
};