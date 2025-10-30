const express = require('express');
const router = express.Router();
const huyenController = require('../controllers/huyenController');

//router.get('/', huyenController.getAllHuyen); 
router.get('/search', huyenController.searchHuyen);
router.get('/', huyenController.getPaginatedHuyen);
router.get('/:id', huyenController.getHuyenById);
router.put('/:id', huyenController.updateHuyen);
router.delete('/:id', huyenController.deleteHuyen);

module.exports = router;