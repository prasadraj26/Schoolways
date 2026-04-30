# Schoolways API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All API endpoints require JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Auth Routes
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout

### Admin Routes
- `GET /admin/dashboard` - Get admin dashboard statistics
- `GET /admin/settings` - Get system settings
- `PUT /admin/settings` - Update system settings

### Teacher Routes
- `GET /teacher/dashboard` - Get teacher dashboard
- `GET /teacher/classes` - Get teacher's classes
- `GET /teacher/students` - Get teacher's students

### Parent Routes
- `GET /parent/dashboard` - Get parent dashboard
- `GET /parent/child/:studentId/attendance` - Get child attendance
- `GET /parent/child/:studentId/results` - Get child results

### Attendance Routes
- `GET /attendance/:studentId` - Get student attendance
- `POST /attendance` - Mark attendance
- `GET /attendance/class/:classId/bulk` - Get class attendance for a date

### Marks Routes
- `GET /marks/:studentId` - Get student marks
- `PUT /marks/:studentId` - Update student marks
- `GET /marks/class/:classId` - Get class marks

### Reports Routes
- `POST /reports/generate` - Generate report
- `GET /reports` - Get list of reports
- `GET /reports/:reportId/download` - Download report

## Response Format
All responses are in JSON format:
```json
{
  "success": true,
  "data": {},
  "message": "Success message"
}
```

## Error Handling
Errors are returned with appropriate HTTP status codes:
```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "statusCode": 400
  }
}
```
