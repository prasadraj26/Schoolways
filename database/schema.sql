-- Schoolways Database Schema

CREATE DATABASE IF NOT EXISTS schoolways;
USE schoolways;

-- Users Table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role ENUM('admin', 'teacher', 'student', 'parent') NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Students Table
CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  class_id INT,
  roll_number VARCHAR(50) UNIQUE,
  admission_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Teachers Table
CREATE TABLE teachers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  department VARCHAR(100),
  specialization VARCHAR(100),
  hire_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Classes Table
CREATE TABLE classes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL,
  teacher_id INT,
  capacity INT DEFAULT 40,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

-- Attendance Table
CREATE TABLE attendance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  class_id INT NOT NULL,
  date DATE NOT NULL,
  status ENUM('present', 'absent', 'leave', 'late') DEFAULT 'absent',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (class_id) REFERENCES classes(id),
  UNIQUE KEY unique_attendance (student_id, class_id, date)
);

-- Marks Table
CREATE TABLE marks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  class_id INT NOT NULL,
  subject VARCHAR(100) NOT NULL,
  exam_type VARCHAR(50),
  marks DECIMAL(5,2),
  total_marks DECIMAL(5,2) DEFAULT 100,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (class_id) REFERENCES classes(id)
);

-- Notifications Table
CREATE TABLE notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_class_id ON students(class_id);
CREATE INDEX idx_teachers_user_id ON teachers(user_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_marks_student_id ON marks(student_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
