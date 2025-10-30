const huyenModel = require('../models/huyenModel');

const getAllHuyen = async (req, res) => {
  try {
    const response = await huyenModel.getAllHuyen();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching all districts:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}

const getPaginatedHuyen = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const result = await huyenModel.getPaginationHuyen(parseInt(page), parseInt(limit));
    res.status(200).json(result);
  } catch (error) {
    console.error("lỗi controller phân trang :", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

const searchHuyen = async (req, res) => {
  try {
    const query = req.query.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    console.log("🔍 Từ khóa tìm kiếm:", query)
    if (!query) {
      return res.status(400).json({ message: "Thiếu từ khóa tìm kiếm" });
    }
    const result = await huyenModel.searchHuyen(query, page, limit);
    res.status(200).json(result);
  } catch (error) {
    console.error("lỗi contronller tìm kiếm:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

// Trả về tất cả kết quả tìm kiếm (không phân trang) để phục vụ chức năng xuất
const searchHuyenAll = async (req, res) => {
  try {
    const query = req.query.query;
    console.log("🔍 Từ khóa tìm kiếm (all):", query);
    if (!query) {
      return res.status(400).json({ message: "Thiếu từ khóa tìm kiếm" });
    }
    const result = await huyenModel.searchHuyenAll(query);
    res.status(200).json(result);
  } catch (error) {
    console.error("lỗi contronller tìm kiếm (all):", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

const getHuyenById = async (req, res) => {
  const { id } = req.params;
  try {
    const huyen = await huyenModel.getHuyenById(id);
    res.status(200).json(huyen);
  } catch (error) {
    console.error("Error fetching district by ID:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}

const updateHuyen = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log("Dữ liệu gửi lên:", data);
  try {
    const updatedHuyen = await huyenModel.updateHuyen(id, data);
    res.status(200).json(updatedHuyen);
  } catch (error) {
    console.error("Error updating district:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}

const deleteHuyen = async (req, res) => {
  const { id } = req.params;
  try {
    await huyenModel.deleteHuyen(id);
    res.status(200).json({ message: "Huyện đã được xóa thành công" });
  } catch (error) {
    console.error("Error deleting district:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}

module.exports = {
  getAllHuyen,
  getPaginatedHuyen,
  searchHuyen,
  searchHuyenAll,
  getHuyenById,
  updateHuyen,
  deleteHuyen
}