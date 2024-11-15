const express = require ('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const isAuthenticated = require('../middleware/auth');

router.post('/customers', isAuthenticated, customerController.createCustomer);
router.get('/customers/list', isAuthenticated, customerController.getCustomer);

router.get('/customers/high-spending', isAuthenticated, customerController.getHighSpendingCustomers);
router.get('/customers/low-spending', isAuthenticated, customerController.getLowSpendingCustomers);

router.get('/customers/high-visits', isAuthenticated, customerController.getHighVisitsCustomers);
router.get('/customers/low-visits', isAuthenticated, customerController.getLowVisitsCustomers);

router.get('/customers/high-spending-high-visits', isAuthenticated, customerController.getHighSpendingHighVisitCustomers);
router.get('/customers/high-spending-low-visits', isAuthenticated, customerController.getHighSpendingLowVisitCustomers);
router.get('/customers/low-spending-high-visits', isAuthenticated, customerController.getLowSpendingHighVisitCustomers);
router.get('/customers/low-spending-low-visits', isAuthenticated, customerController.getLowSpendingLowVisitCustomers);

router.get('/customers/inactive', isAuthenticated, customerController.getInactiveCustomers);
router.get('/customers/active', isAuthenticated, customerController.getActiveCustomers);

module.exports = router