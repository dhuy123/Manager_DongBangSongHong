const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Endpoint to get all accounts (no pagination)
router.get('/all', accountController.getAllAccount);
// Endpoint to get all search results (no pagination)
router.get('/search', accountController.searchAccount);
router.get('/search/all', accountController.searchAccountAll);
router.get('/', accountController.getPaginatedAccount);
router.get('/:id', accountController.getAccountById);
router.post('/', accountController.createAccount);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

module.exports = router;