const express = require ('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
router.post('/customers', customerController.createCustomer);
router.get('/customers/list', customerController.getCustomer);
module.exports = router