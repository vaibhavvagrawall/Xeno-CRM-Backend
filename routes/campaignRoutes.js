const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const isAuthenticated = require('../middleware/auth');

router.post('/campaigns', isAuthenticated, campaignController.createCampaign);
router.post('/campaigns/history', isAuthenticated, campaignController.getCampaign);

module.exports = router;
