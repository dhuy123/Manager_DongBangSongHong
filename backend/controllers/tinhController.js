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
  console.log("Dữ liệu gửi lên:", data);
  try {
    const updatedTinh = await tinhModel.updateTinh(id, data);
    res.status(200).json(updatedTinh);
  } catch (error) {
    console.error("Error updating province:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}
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
  deleteTinh
}