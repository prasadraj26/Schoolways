const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware, roleMiddleware(['teacher']));

router.get('/dashboard', teacherController.getTeacherDashboard);
router.get('/classes', teacherController.getTeacherClasses);
router.get('/students', teacherController.getTeacherStudents);

module.exports = router;
