const bcrypt = require('bcrypt');

class HashUtil {
  static async hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error(`Failed to hash password: ${error.message}`);
    }
  }

  static async comparePassword(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new Error(`Failed to compare passwords: ${error.message}`);
    }
  }
}

module.exports = HashUtil;
