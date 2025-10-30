const express = require('express');
const router = express.Router();
const xaController = require('../controllers/xaController');

router.get('/search', xaController.searchXa);
// Endpoint to get all xa (no pagination) for export
router.get('/all', xaController.getAllXa);
// Endpoint to get all search results (no pagination)
router.get('/search/all', xaController.searchXaAll);
router.get('/', xaController.getPaginatedXa);
router.get('/:id', xaController.getXaById);
router.put('/:id', xaController.updateXa);
router.delete('/:id', xaController.deleteXa);

module.exports = router;