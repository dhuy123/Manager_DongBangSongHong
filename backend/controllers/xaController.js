const xaModel = require('../models/XaModel');

const getAllXa = async (req, res) => {
  try {
    const response = await xaModel.getAllXa();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching all districts:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}

const getPaginatedXa = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const result = await xaModel.getPaginationXa(parseInt(page), parseInt(limit));
    res.status(200).json(result);
  } catch (error) {
    console.error("lỗi controller phân trang :", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

const searchXa = async (req, res) => {
  try {
    const query = req.query.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    console.log("🔍 Từ khóa tìm kiếm:", query)
    if (!query) {
      return res.status(400).json({ message: "Thiếu từ khóa tìm kiếm" });
    }
    const result = await xaModel.searchXa(query, page, limit);
    res.status(200).json(result);
  } catch (error) {
    console.error("lỗi contronller tìm kiếm:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Trả về tất cả kết quả tìm kiếm (không phân trang) để xuất
const searchXaAll = async (req, res) => {
  try {
    const query = req.query.query;
    console.log("🔍 Từ khóa tìm kiếm (all):", query);
    if (!query) {
      return res.status(400).json({ message: "Thiếu từ khóa tìm kiếm" });
    }
    const result = await xaModel.searchXaAll(query);
    res.status(200).json(result);
  } catch (error) {
    console.error("lỗi contronller tìm kiếm (all):", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

const getXaById = async (req, res) => {
  const { id } = req.params;
  console.log("đã vào controller xã by id", id);
  try {
    const xa = await xaModel.getXaById(id);
    res.status(200).json(xa);
  } catch (error) {
    console.error("Error fetching district by ID:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}

const updateXa = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log("Dữ liệu gửi lên:", data);
  try {
    const updatedXa = await xaModel.updateXa(id, data);
    res.status(200).json(updatedXa);
  } catch (error) {
    console.error("Error updating district:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}

const deleteXa = async (req, res) => {
  const { id } = req.params;
  try {
    await xaModel.deleteXa(id);
    res.status(200).json({ message: "Huyện đã được xóa thành công" });
  } catch (error) {
    console.error("Error deleting district:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}

const exportGeoJson = async (req, res) => {
  const { id } = req.params;
  try {
    const geoJson = await xaModel.exportGeoJson(id);
    res.status(200).json(geoJson);
  } catch (error) {
    console.error("Error exporting GeoJSON:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};  


module.exports = {
  getAllXa,
  getPaginatedXa,
  searchXa,
  searchXaAll,
  getXaById,
  updateXa,
  deleteXa,
  exportGeoJson
}