const tinhModel = require('../models/tinhModel');

const getAllTinh = async (req, res) => {
  try {
    const reponse = await tinhModel.getAllTinh();
    res.status(200).json(reponse);
    console.log("Lấy tất cả tỉnh ", res.status(200).json(reponse));
  } catch (error) {
    console.error("Error fetching all provinces:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}

const getPaginatedTinh = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  console.log("Tạo phân trang tỉnh - trang:", page, " giới hạn:", limit);
  try {
    const result = await tinhModel.getPaginationTinh(parseInt(page), parseInt(limit));
    res.status(200).json(result);
   // console.log("Phân trang tỉnh:", res.status(200).json(result));
  } catch (error) {
    console.error("lỗi tạo phân trang:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}

const searchTinh = async (req, res) => {
  try {
    const query = req.query.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    console.log("Từ khóa tìm kiếm:", query);
    if (!query) {
      return res.status(400).json({ message: "Thiếu từ khóa tìm kiếm" });
    }
    const result = await tinhModel.searchTinh(query, page, limit);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error searching province:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Trả về tất cả kết quả tìm kiếm (không phân trang)
const searchTinhAll = async (req, res) => {
  try {
    const query = req.query.query;
    console.log("🔍 (all) Từ khóa tìm kiếm:", query);
    if (!query) {
      return res.status(400).json({ message: "Thiếu từ khóa tìm kiếm" });
    }
    const result = await tinhModel.searchTinhAll(query);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error searching provinces (all):", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

const getTinhById = async (req, res) => {
  const { id } = req.params;
  try {
    const tinh = await tinhModel.getTinhById(id);
    res.status(200).json(tinh);
  } catch (error) {
    console.error("Error fetching province by ID:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}

const updateTinh = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  //console.log(" Body nhận được:", data);

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ message: "Không có dữ liệu gửi lên!" });
  }

  try {
    const updatedTinh = await tinhModel.updateTinh(id, data);
    //console.log("Dữ liệu cập nhật:", updatedTinh);

    res.status(200).json({
      message: "Cập nhật thành công",
      du_lieu_moi: updatedTinh
    });
  } catch (error) {
    console.error("Error updating province:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

const deleteTinh = async (req, res) => {
  const { id } = req.params;
  try {
    await tinhModel.deleteTinh(id);
    res.status(200).json({ message: "Tỉnh đã được xóa thành công" });
  } catch (error) {
    console.error("Error deleting province:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}

const exportGeoJson = async (req, res) => {
  const { id } = req.params;
  // console.log("Xuất GeoJSON cho id:", id);
  try {
    const { ten_tinh, geojson } = await tinhModel.exportGeoJson(id);
    // console.log("geojson:", geojson.features[0]);
    // Xử lý tên file (không dấu, không ký tự lạ)
    const fileName =
      (geojson?.features?.[0]?.properties?.ten_tinh || "tinh_khong_ten")
        .normalize("NFD")  //tách chữ có dấu ra
        .replace(/[\u0300-\u036f]/g, "")// xoá dấu
        .replace(/\s+/g, "_")// thay khoảng trắng bằng _
        .replace(/[^\w_]/g, "")// xoá ký tự lạ
      + ".geojson";
     //console.log("Tên file xuất:", fileName);
     //console.log("dữ liệu GeoJSON chuẩn bị gửi:", geojson.features);
    // Chuyển geojson thành chuỗi JSON
    const data = JSON.stringify(geojson, null, 2);
    console.log("Dữ liệu GeoJSON chuỗi:", data);

    // Cài header để trình duyệt tải file
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    // console.log("Gửi dữ liệu GeoJSON:", res.getHeaders());
    // Gửi dữ liệu
    res.send(data);
  } catch (error) {
    console.error("Error exporting GeoJSON:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

module.exports = {
  getAllTinh,
  getTinhById,
  updateTinh,
  deleteTinh,
  getPaginatedTinh,
  searchTinh,
  searchTinhAll,
  exportGeoJson,
}