# Schoolways Database Design

## Database Name
`schoolways`

## Tables

### 1. Users
Central authentication and user management table.
```
- id (INT, PK, AUTO_INCREMENT)
- email (VARCHAR, UNIQUE)
- password (VARCHAR)
- first_name (VARCHAR)
- last_name (VARCHAR)
- role (ENUM: admin, teacher, student, parent)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 2. Students
Student-specific information.
```
- id (INT, PK, AUTO_INCREMENT)
- user_id (INT, FK -> users.id)
- class_id (INT, FK -> classes.id)
- roll_number (VARCHAR, UNIQUE)
- admission_date (DATE)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 3. Teachers
Teacher-specific information.
```
- id (INT, PK, AUTO_INCREMENT)
- user_id (INT, FK -> users.id)
- department (VARCHAR)
- specialization (VARCHAR)
- hire_date (DATE)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 4. Classes
Class information.
```
- id (INT, PK, AUTO_INCREMENT)
- name (VARCHAR, UNIQUE)
- teacher_id (INT, FK -> teachers.id)
- capacity (INT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 5. Attendance
Daily attendance records.
```
- id (INT, PK, AUTO_INCREMENT)
- student_id (INT, FK -> students.id)
- class_id (INT, FK -> classes.id)
- date (DATE)
- status (ENUM: present, absent, leave, late)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- UNIQUE(student_id, class_id, date)
```

### 6. Marks
Student examination marks.
```
- id (INT, PK, AUTO_INCREMENT)
- student_id (INT, FK -> students.id)
- class_id (INT, FK -> classes.id)
- subject (VARCHAR)
- exam_type (VARCHAR)
- marks (DECIMAL)
- total_marks (DECIMAL)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 7. Notifications
User notifications.
```
- id (INT, PK, AUTO_INCREMENT)
- user_id (INT, FK -> users.id)
- message (TEXT)
- type (VARCHAR)
- is_read (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## Relationships
- Users → Students (1:1)
- Users → Teachers (1:1)
- Students → Classes (N:1)
- Teachers → Classes (1:N)
- Students → Attendance (1:N)
- Students → Marks (1:N)
- Users → Notifications (1:N)

## Indexes
- `idx_students_user_id` on students.user_id
- `idx_students_class_id` on students.class_id
- `idx_teachers_user_id` on teachers.user_id
- `idx_attendance_date` on attendance.date
- `idx_marks_student_id` on marks.student_id
- `idx_notifications_user_id` on notifications.user_id

## Performance Optimization
- Connection pooling for better performance
- Indexes on frequently queried columns
- Proper primary key and foreign key definitions
- Prepared statements to prevent SQL injection
