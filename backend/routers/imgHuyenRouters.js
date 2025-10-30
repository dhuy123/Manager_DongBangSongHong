const imgHuyenController = require('../controllers/imgHuyenController');

const express = require('express');
const router = express.Router();

router.get('/ma_huyen/:ma_huyen', imgHuyenController.getImgHuyenByMaHuyen);
router.get('/id/:id', imgHuyenController.getImgHuyenById);
router.post('/', imgHuyenController.createImgHuyen);
router.put('/:id', imgHuyenController.updateImgHuyen);
router.delete('/:id', imgHuyenController.deleteImgHuyen);

module.exports = router;