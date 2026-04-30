// Class Model

const pool = require('../config/db');

class Class {
  static async create(classData) {
    const query = 'INSERT INTO classes SET ?';
    const [result] = await pool.query(query, classData);
    return result;
  }

  static async findAll() {
    const query = 'SELECT * FROM classes';
    const [rows] = await pool.query(query);
    return rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM classes WHERE id = ?';
    const [rows] = await pool.query(query, [id]);
    return rows[0];
  }

  static async update(id, classData) {
    const query = 'UPDATE classes SET ? WHERE id = ?';
    const [result] = await pool.query(query, [classData, id]);
    return result;
  }

  static async delete(id) {
    const query = 'DELETE FROM classes WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    return result;
  }
}

module.exports = Class;
