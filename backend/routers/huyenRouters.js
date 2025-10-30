const express = require('express');
const router = express.Router();
const huyenController = require('../controllers/huyenController');

router.get('/search', huyenController.searchHuyen);
// Endpoint to get all huyen (no pagination) for export
router.get('/all', huyenController.getAllHuyen);
// Endpoint to get all search results (no pagination)
router.get('/search/all', huyenController.searchHuyenAll);
router.get('/', huyenController.getPaginatedHuyen);
router.get('/:id', huyenController.getHuyenById);
router.put('/:id', huyenController.updateHuyen);
router.delete('/:id', huyenController.deleteHuyen);

module.exports = router;