const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/:studentId', attendanceController.getAttendance);
router.post('/', attendanceController.markAttendance);
router.get('/class/:classId/bulk', attendanceController.getBulkAttendance);

module.exports = router;
