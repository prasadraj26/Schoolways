-- Sample data for Schoolways

USE schoolways;

-- Insert sample users
INSERT INTO users (email, password, first_name, last_name, role) VALUES
('admin@schoolways.com', 'hashed_password_1', 'Admin', 'User', 'admin'),
('teacher1@schoolways.com', 'hashed_password_2', 'John', 'Smith', 'teacher'),
('student1@schoolways.com', 'hashed_password_3', 'Alice', 'Johnson', 'student'),
('parent1@schoolways.com', 'hashed_password_4', 'Robert', 'Johnson', 'parent');

-- Insert sample classes
INSERT INTO classes (name, teacher_id, capacity) VALUES
('Class 10-A', 2, 40),
('Class 10-B', 2, 42),
('Class 9-A', 2, 38);

-- Insert sample students
INSERT INTO students (user_id, class_id, roll_number, admission_date) VALUES
(3, 1, 'SW2024001', '2024-01-15');

-- Insert sample attendance
INSERT INTO attendance (student_id, class_id, date, status) VALUES
(1, 1, CURDATE(), 'present');

-- Insert sample marks
INSERT INTO marks (student_id, class_id, subject, exam_type, marks, total_marks) VALUES
(1, 1, 'Mathematics', 'Midterm', 85, 100),
(1, 1, 'English', 'Midterm', 92, 100);

-- Insert sample notifications
INSERT INTO notifications (user_id, message, type) VALUES
(3, 'You have been marked present on today', 'attendance'),
(4, 'Your child marks have been updated', 'marks');
