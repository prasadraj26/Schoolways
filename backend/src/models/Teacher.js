// Teacher Model

const pool = require('../config/db');

class Teacher {
  static async create(teacherData) {
    const query = 'INSERT INTO teachers SET ?';
    const [result] = await pool.query(query, teacherData);
    return result;
  }

  static async findAll() {
    const query = 'SELECT * FROM teachers';
    const [rows] = await pool.query(query);
    return rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM teachers WHERE id = ?';
    const [rows] = await pool.query(query, [id]);
    return rows[0];
  }

  static async update(id, teacherData) {
    const query = 'UPDATE teachers SET ? WHERE id = ?';
    const [result] = await pool.query(query, [teacherData, id]);
    return result;
  }

  static async delete(id) {
    const query = 'DELETE FROM teachers WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    return result;
  }
}

module.exports = Teacher;
