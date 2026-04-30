# Schoolways Architecture

## Overview
Schoolways is a school management system with a React (Vite) frontend and Node.js/Express backend.

## Project Structure

### Frontend (React + Vite)
- **Components**: Reusable UI components organized by type (common, charts, forms)
- **Pages**: Route pages organized by user role (auth, admin, teacher, parent)
- **Services**: API communication layer
- **Context**: Global state management using React Context
- **Hooks**: Custom React hooks
- **Utils**: Helper functions and constants
- **Styles**: CSS styling with theme variables

### Backend (Node.js + Express)
- **Controllers**: Request handlers for business logic
- **Models**: Database models for data abstraction
- **Routes**: API endpoint definitions
- **Middleware**: Request processing (auth, validation, error handling)
- **Services**: Business logic layer
- **Utils**: Helper utilities (hashing, JWT, PDF/Excel generation, logging)
- **Jobs**: Background scheduled tasks
- **Config**: Configuration files

### Database
- MySQL database with proper schema
- Tables for users, students, teachers, classes, attendance, marks, notifications
- Relationships defined using foreign keys
- Indexes for performance optimization

## Technology Stack

### Frontend
- React 18+
- Vite (build tool)
- ESLint (code quality)

### Backend
- Node.js
- Express.js
- MySQL2
- JWT for authentication
- Bcrypt for password hashing

## Design Patterns

### Authentication & Authorization
- JWT token-based authentication
- Role-based access control (RBAC)
- Protected routes middleware

### Database
- Connection pooling
- Prepared statements for SQL injection prevention
- Transaction support

### API Design
- RESTful endpoints
- Consistent error handling
- Request validation

## Security Considerations
- Password hashing with bcrypt
- JWT token expiration
- CORS enabled
- Input validation
- Role-based authorization

## Scalability Features
- Database connection pooling
- Background job scheduling with cron
- Modular architecture
- Service layer for business logic
