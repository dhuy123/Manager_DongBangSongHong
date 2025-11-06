const express = require('express');
const router = express.Router();
const tinhController = require('../controllers/tinhController');

router.get('/search/all', tinhController.searchTinhAll);
router.get('/search', tinhController.searchTinh);
router.get('/all', tinhController.getAllTinh);
router.get('/', tinhController.getPaginatedTinh);
router.get('/:id', tinhController.getTinhById);
router.get('/export-geojson/:ma_tinh', tinhController.exportGeoJson);
router.patch('/:id', tinhController.updateTinh); 
router.put('/:id', tinhController.updateTinh);
router.delete('/:id', tinhController.deleteTinh); 


module.exports = router;

