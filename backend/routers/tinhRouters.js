const express = require('express');
const router = express.Router();
const tinhController = require('../controllers/tinhController');

router.get('/search', tinhController.searchTinh);
router.get('/', tinhController.getPaginatedTinh)
//router.get('/', tinhController.getAllTinh); 
router.get('/:id', tinhController.getTinhById); 
router.patch('/:id', tinhController.updateTinh); 
router.put('/:id', tinhController.updateTinh);
router.delete('/:id', tinhController.deleteTinh); 

module.exports = router;

