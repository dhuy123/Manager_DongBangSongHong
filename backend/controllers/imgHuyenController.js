const imgHuyenModel = require('../models/imgHuyenModel');

// const getAllImgHuyen = async (req, res) => {
//   try {
//     const response = await imgHuyenModel.getAllImgHuyen();
//     res.status(200).json(response);
//   } catch (error) {
//     console.error("Error fetching all province images:", error);
//     res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
//   }
// }

const getImgHuyenByMaHuyen = async (req, res) => {
  const { ma_huyen } = req.params;
  try {
    const imgHuyen = await imgHuyenModel.getImgHuyenByMaHuyen(ma_huyen);
    console.log(" ma_huyen:", ma_huyen);
    res.status(200).json(imgHuyen);
  } catch (error) {
    console.error("Error fetching province images by ma_huyen:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}

const getImgHuyenById = async (req, res) => {
  const { id } = req.params;
  console.log(" id:", id);
  try {
    const imgHuyen = await imgHuyenModel.getImgHuyenById(id);
    res.status(200).json(imgHuyen);
  } catch (error) {
    console.error("Error fetching province image by ID:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}
const createImgHuyen = async (req, res) => {
  const data = req.body;
  try {
    const newImgHuyen = await imgHuyenModel.createImgHuyen(data);
    res.status(201).json(newImgHuyen);
  } catch (error) {
    console.error("Error creating province image:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}
const updateImgHuyen = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedImgHuyen = await imgHuyenModel.updateImgHuyen(id, data);
    res.status(200).json(updatedImgHuyen);
  } catch (error) {
    console.error("Error updating province image:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}
const deleteImgHuyen = async (req, res) => {
  const { id } = req.params;
  try {
    await imgHuyenModel.deleteImgHuyen(id);
    res.status(200).json({ message: "Hình ảnh tỉnh đã được xóa thành công" });
  } catch (error) {
    console.error("Error deleting province image:", error);
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
}
module.exports = {
  // getAllImgHuyen,
  getImgHuyenByMaHuyen,
  getImgHuyenById,
  createImgHuyen,
  updateImgHuyen,
  deleteImgHuyen
};