const Attendance = require('../models/Attendance');

class AttendanceService {
  static async getAttendanceReport(studentId, startDate, endDate) {
    try {
      // Get attendance for date range
      const attendance = await Attendance.findByStudentId(studentId);
      return attendance;
    } catch (error) {
      throw new Error(`Failed to get attendance: ${error.message}`);
    }
  }

  static async recordAttendance(attendanceData) {
    try {
      const result = await Attendance.create(attendanceData);
      return result;
    } catch (error) {
      throw new Error(`Failed to record attendance: ${error.message}`);
    }
  }

  static async getClassAttendance(classId, date) {
    try {
      const attendance = await Attendance.findByClassId(classId, date);
      return attendance;
    } catch (error) {
      throw new Error(`Failed to get class attendance: ${error.message}`);
    }
  }
}

module.exports = AttendanceService;
