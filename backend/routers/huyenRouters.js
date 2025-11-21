const express = require('express');
const router = express.Router();
const huyenController = require('../controllers/huyenController');

router.get('/search', huyenController.searchHuyen);
router.get('/all', huyenController.getAllHuyen);
router.get('/search/all', huyenController.searchHuyenAll);
router.get('/', huyenController.getPaginatedHuyen);
router.get('/:id', huyenController.getHuyenById);
router.get('/export-geojson/:id', huyenController.exportGeoJson);
router.patch('/:id', huyenController.updateHuyen);
router.delete('/:id', huyenController.deleteHuyen);

module.exports = router;