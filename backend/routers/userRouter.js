const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Sử dụng controller để xử lý POST /
router.post('/', userController.login);

module.exports = router;
