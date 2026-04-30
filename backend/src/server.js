const app = require('./app');
const { PORT } = require('./config/env');
const AttendanceScheduler = require('./jobs/attendanceScheduler');
const logger = require('./utils/logger');

// Start scheduler
AttendanceScheduler.start();

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});
