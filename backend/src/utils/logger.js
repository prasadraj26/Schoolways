const fs = require('fs');
const path = require('path');

class Logger {
  static log(level, message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${level}: ${message}\n`;
    
    console.log(logMessage);

    const logPath = path.join(__dirname, '../../logs/app.log');
    fs.appendFileSync(logPath, logMessage);
  }

  static info(message) {
    this.log('INFO', message);
  }

  static warn(message) {
    this.log('WARN', message);
  }

  static error(message) {
    this.log('ERROR', message);
  }

  static debug(message) {
    if (process.env.NODE_ENV === 'development') {
      this.log('DEBUG', message);
    }
  }
}

module.exports = Logger;
