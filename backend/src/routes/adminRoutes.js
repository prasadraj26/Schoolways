const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware, roleMiddleware(['admin']));

router.get('/dashboard', adminController.getDashboardStats);
router.get('/settings', adminController.getSystemSettings);
router.put('/settings', adminController.updateSystemSettings);

module.exports = router;
