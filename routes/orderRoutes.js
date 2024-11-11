const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
router.post('/orders', orderController.createOrder);
router.get('/orders/list', orderController.getOrder);
module.exports = router;