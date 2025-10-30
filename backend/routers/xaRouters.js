const express = require('express');
const router = express.Router();
const xaController = require('../controllers/xaController');

//router.get('/', xaController.getAllXa); 
router.get('/search', xaController.searchXa);
router.get('/', xaController.getPaginatedXa);
router.get('/:id', xaController.getXaById);
router.put('/:id', xaController.updateXa);
router.delete('/:id', xaController.deleteXa);

module.exports = router;