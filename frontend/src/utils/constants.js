// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// User Roles
export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
  PARENT: 'parent'
};

// Status Constants
export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LEAVE: 'leave',
  LATE: 'late'
};

// Messages
export const MESSAGES = {
  SUCCESS: 'Operation completed successfully',
  ERROR: 'An error occurred',
  LOADING: 'Loading...'
};
