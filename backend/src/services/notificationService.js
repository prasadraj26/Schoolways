const Notification = require('../models/Notification');

class NotificationService {
  static async sendNotification(userId, message, type) {
    try {
      const notificationData = {
        user_id: userId,
        message,
        type,
        is_read: false,
        created_at: new Date()
      };
      return await Notification.create(notificationData);
    } catch (error) {
      throw new Error(`Failed to send notification: ${error.message}`);
    }
  }

  static async getUserNotifications(userId) {
    try {
      return await Notification.findByUserId(userId);
    } catch (error) {
      throw new Error(`Failed to get notifications: ${error.message}`);
    }
  }

  static async markNotificationRead(notificationId) {
    try {
      return await Notification.update(notificationId, { is_read: true });
    } catch (error) {
      throw new Error(`Failed to mark notification as read: ${error.message}`);
    }
  }
}

module.exports = NotificationService;
