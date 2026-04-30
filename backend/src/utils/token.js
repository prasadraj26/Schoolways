const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE } = require('../config/env');

class TokenUtil {
  static generateToken(payload) {
    try {
      return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
    } catch (error) {
      throw new Error(`Failed to generate token: ${error.message}`);
    }
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error(`Failed to verify token: ${error.message}`);
    }
  }

  static decodeToken(token) {
    try {
      return jwt.decode(token);
    } catch (error) {
      throw new Error(`Failed to decode token: ${error.message}`);
    }
  }
}

module.exports = TokenUtil;
