// Student Model

const pool = require('../config/db');

class Student {
  static async create(studentData) {
    const query = 'INSERT INTO students SET ?';
    const [result] = await pool.query(query, studentData);
    return result;
  }

  static async findAll() {
    const query = 'SELECT * FROM students';
    const [rows] = await pool.query(query);
    return rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM students WHERE id = ?';
    const [rows] = await pool.query(query, [id]);
    return rows[0];
  }

  static async update(id, studentData) {
    const query = 'UPDATE students SET ? WHERE id = ?';
    const [result] = await pool.query(query, [studentData, id]);
    return result;
  }

  static async delete(id) {
    const query = 'DELETE FROM students WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    return result;
  }
}

module.exports = Student;
