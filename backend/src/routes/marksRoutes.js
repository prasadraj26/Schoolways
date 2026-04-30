const express = require('express');
const router = express.Router();
const marksController = require('../controllers/marksController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/:studentId', marksController.getMarks);
router.put('/:studentId', marksController.updateMarks);
router.get('/class/:classId', marksController.getClassMarks);

module.exports = router;
