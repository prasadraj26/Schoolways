// User Model

const pool = require('../config/db');

class User {
  static async create(userData) {
    const query = 'INSERT INTO users SET ?';
    const [result] = await pool.query(query, userData);
    return result;
  }

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await pool.query(query, [id]);
    return rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.query(query, [email]);
    return rows[0];
  }

  static async update(id, userData) {
    const query = 'UPDATE users SET ? WHERE id = ?';
    const [result] = await pool.query(query, [userData, id]);
    return result;
  }

  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    return result;
  }
}

module.exports = User;
