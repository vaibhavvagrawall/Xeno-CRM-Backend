const express = require ('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/customers', customerController.createCustomer);
router.get('/customers/list', customerController.getCustomer);

router.get('/customers/high-spending', customerController.getHighSpendingCustomers);
router.get('/customers/low-spending', customerController.getLowSpendingCustomers);

router.get('/customers/high-visits', customerController.getHighVisitsCustomers);
router.get('/customers/low-visits', customerController.getLowVisitsCustomers);

router.get('/customers/high-spending-high-visits', customerController.getHighSpendingHighVisitCustomers);
router.get('/customers/high-spending-low-visits', customerController.getHighSpendingLowVisitCustomers);
router.get('/customers/low-spending-high-visits', customerController.getLowSpendingHighVisitCustomers);
router.get('/customers/low-spending-low-visits', customerController.getLowSpendingLowVisitCustomers);

router.get('/customers/inactive', customerController.getInactiveCustomers);

module.exports = router