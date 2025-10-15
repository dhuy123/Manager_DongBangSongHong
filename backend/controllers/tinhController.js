const tinhModel = require('../models/tinhModel');

const getAllTinh = async (req, res) => {
  try {
    const reponse = await tinhModel.getAllTinh();
    res.status(200).json(reponse);
  } catch (error) {
    console.error("Error fetching all provinces:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}

const getPaginatedTinh = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const result = await tinhModel.getPaginationTinh(parseInt(page), parseInt(limit));
    res.status(200).json(result);
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
    console.log("🔍 Từ khóa tìm kiếm:", query);
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

  console.log("📦 Body nhận được:", data);

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ message: "❌ Không có dữ liệu gửi lên!" });
  }

  try {
    const updatedTinh = await tinhModel.updateTinh(id, data);
    console.log("✅ Dữ liệu cập nhật:", updatedTinh);

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

module.exports = {
  getAllTinh,
  getTinhById,
  updateTinh,
  deleteTinh,
  getPaginatedTinh,
  searchTinh,
}