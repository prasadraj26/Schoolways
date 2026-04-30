// Attendance Model

const pool = require('../config/db');

class Attendance {
  static async create(attendanceData) {
    const query = 'INSERT INTO attendance SET ?';
    const [result] = await pool.query(query, attendanceData);
    return result;
  }

  static async findByStudentId(studentId) {
    const query = 'SELECT * FROM attendance WHERE student_id = ?';
    const [rows] = await pool.query(query, [studentId]);
    return rows;
  }

  static async findByClassId(classId, date) {
    const query = 'SELECT * FROM attendance WHERE class_id = ? AND date = ?';
    const [rows] = await pool.query(query, [classId, date]);
    return rows;
  }

  static async update(id, attendanceData) {
    const query = 'UPDATE attendance SET ? WHERE id = ?';
    const [result] = await pool.query(query, [attendanceData, id]);
    return result;
  }

  static async delete(id) {
    const query = 'DELETE FROM attendance WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    return result;
  }
}

module.exports = Attendance;
