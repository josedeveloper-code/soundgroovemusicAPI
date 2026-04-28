const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.get('/overview', adminController.getAdminOverview);
route.get('/admin'), adminController 
module.exports = router;

