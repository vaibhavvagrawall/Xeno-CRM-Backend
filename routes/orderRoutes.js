const express = require ('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const isAuthenticated = require('../middleware/auth');

router.post('/orders', isAuthenticated, orderController.createOrder);
router.get('/orders/list', isAuthenticated, orderController.getOrder);

module.exports = router;