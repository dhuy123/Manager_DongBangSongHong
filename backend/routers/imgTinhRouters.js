const imgTinhController = require('../controllers/imgTinhController');

const express = require('express');
const router = express.Router();

router.get('/:id', imgTinhController.getImgTinhById);
router.get('/:ma_tinh', imgTinhController.getImgTinhByMaTinh);
router.post('/', imgTinhController.createImgTinh);
router.put('/:id', imgTinhController.updateImgTinh);
router.delete('/:id', imgTinhController.deleteImgTinh);

module.exports = router;