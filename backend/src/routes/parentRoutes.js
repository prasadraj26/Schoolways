const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware, roleMiddleware(['parent']));

router.get('/dashboard', parentController.getParentDashboard);
router.get('/child/:studentId/attendance', parentController.getChildAttendance);
router.get('/child/:studentId/results', parentController.getChildResults);

module.exports = router;
