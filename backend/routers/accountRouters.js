const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Lấy danh sách tất cả các tài khoản
router.get('/', accountController.getAllAccount);
// Lấy thông tin tài khoản theo ID
router.get('/:id', accountController.getAccountById);
// Tạo tài khoản mới
router.post('/', accountController.createAccount);
// Cập nhật thông tin tài khoản theo ID
router.put('/:id', accountController.updateAccount);
// Xóa tài khoản theo ID
router.delete('/:id', accountController.deleteAccount);

module.exports = router;