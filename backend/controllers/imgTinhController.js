const imgTinhModel = require('../models/imgTinhModel');

// const getAllImgTinh = async (req, res) => {
//   try {
//     const response = await imgTinhModel.getAllImgTinh();
//     res.status(200).json(response);
//   } catch (error) {
//     console.error("Error fetching all province images:", error);
//     res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
//   }
// }

const getImgTinhByMaTinh = async (req, res) => {
  const { ma_tinh } = req.params;
  try {
    const imgTinh = await imgTinhModel.getImgTinhByMaTinh(ma_tinh);
    console.log(" ma_tinh:", ma_tinh);
    res.status(200).json(imgTinh);
  } catch (error) {
    console.error("Error fetching province images by ma_tinh:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}

const getImgTinhById = async (req, res) => {
  const { id } = req.params;
  try {
    const imgTinh = await imgTinhModel.getImgTinhById(id);
    res.status(200).json(imgTinh);
  } catch (error) {
    console.error("Error fetching province image by ID:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}
const createImgTinh = async (req, res) => {
  const data = req.body;
  try {
    const newImgTinh = await imgTinhModel.createImgTinh(data);
    res.status(201).json(newImgTinh);
  } catch (error) {
    console.error("Error creating province image:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}
const updateImgTinh = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedImgTinh = await imgTinhModel.updateImgTinh(id, data);
    res.status(200).json(updatedImgTinh);
  } catch (error) {
    console.error("Error updating province image:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}
const deleteImgTinh = async (req, res) => {
  const { id } = req.params;
  try {
    await imgTinhModel.deleteImgTinh(id);
    res.status(200).json({ message: "Hình ảnh tỉnh đã được xóa thành công" });
  } catch (error) {
    console.error("Error deleting province image:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}
module.exports = {
  // getAllImgTinh,
  getImgTinhByMaTinh,
  getImgTinhById,
  createImgTinh,
  updateImgTinh,
  deleteImgTinh
};