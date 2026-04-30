// Marks Model

const pool = require('../config/db');

class Marks {
  static async create(marksData) {
    const query = 'INSERT INTO marks SET ?';
    const [result] = await pool.query(query, marksData);
    return result;
  }

  static async findByStudentId(studentId) {
    const query = 'SELECT * FROM marks WHERE student_id = ?';
    const [rows] = await pool.query(query, [studentId]);
    return rows;
  }

  static async findByClassId(classId) {
    const query = 'SELECT * FROM marks WHERE class_id = ?';
    const [rows] = await pool.query(query, [classId]);
    return rows;
  }

  static async update(id, marksData) {
    const query = 'UPDATE marks SET ? WHERE id = ?';
    const [result] = await pool.query(query, [marksData, id]);
    return result;
  }

  static async delete(id) {
    const query = 'DELETE FROM marks WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    return result;
  }
}

module.exports = Marks;
