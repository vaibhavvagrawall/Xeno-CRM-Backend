const express = require ('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const isAuthenticated = require('../middleware/auth');

router.post('/customers', isAuthenticated, customerController.createCustomer);
router.get('/customers/list', isAuthenticated, customerController.getCustomer);

module.exports = router