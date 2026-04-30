// Notification Model

const pool = require('../config/db');

class Notification {
  static async create(notificationData) {
    const query = 'INSERT INTO notifications SET ?';
    const [result] = await pool.query(query, notificationData);
    return result;
  }

  static async findByUserId(userId) {
    const query = 'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC';
    const [rows] = await pool.query(query, [userId]);
    return rows;
  }

  static async update(id, notificationData) {
    const query = 'UPDATE notifications SET ? WHERE id = ?';
    const [result] = await pool.query(query, [notificationData, id]);
    return result;
  }

  static async delete(id) {
    const query = 'DELETE FROM notifications WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    return result;
  }
}

module.exports = Notification;
