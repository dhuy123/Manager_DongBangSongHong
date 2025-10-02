const express = require('express');
const router = express.Router();
const tinhController = require('../controllers/tinhController');

router.get('/', tinhController.getAllTinh); // Lấy danh sách tất cả các tỉnh
router.get('/:id', tinhController.getTinhById); // Lấy thông tin tỉnh theo ID
router.put('/:id', tinhController.updateTinh); // Cập nhật thông tin tỉnh theo ID
router.delete('/:id', tinhController.deleteTinh); // Xóa tỉnh theo ID

module.exports = router;

