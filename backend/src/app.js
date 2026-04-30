const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/errorMiddleware');

// Import routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const parentRoutes = require('./routes/parentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const marksRoutes = require('./routes/marksRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/parent', parentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/marks', marksRoutes);
app.use('/api/reports', reportRoutes);

// Error handling
app.use(errorMiddleware);

module.exports = app;
