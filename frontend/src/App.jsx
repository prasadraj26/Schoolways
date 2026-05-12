import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useEffect } from "react";
import { initializeAuthListener } from "./hooks/useAuth";

// AUTH

import Login from "./pages/Login";

// DASHBOARDS

import AdminDashboard
  from "./pages/AdminDashboard";

import TeacherDashboard
  from "./pages/TeacherDashboard";

import ParentDashboard
  from "./pages/ParentDashboard";

// COMMON PAGES

import Students
  from "./pages/Students";

import Attendance
  from "./pages/Attendance";

import Marks
  from "./pages/Marks";

import Reports
  from "./pages/Reports";

// ADMIN PAGES

import AddStudent
  from "./pages/admin/AddStudent";

import AddTeacher
  from "./pages/admin/AddTeacher";

import AddClass
  from "./pages/admin/AddClass";

import ManageStudents
  from "./pages/admin/ManageStudents";

import ManageTeachers
  from "./pages/admin/ManageTeachers";

import EditStudent
  from "./pages/admin/EditStudent";

// PROTECTED ROUTE

import ProtectedRoute
  from "./components/ProtectedRoute";

function App() {
  useEffect(() => {
    const unsubscribe = initializeAuthListener();
    return () => unsubscribe();
  }, []);

  return (

    <Routes>

      {/* LOGIN */}

      <Route
        path="/"
        element={<Login />}
      />

      {/* ADMIN */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">

            <AdminDashboard />

          </ProtectedRoute>
        }
      />

      {/* TEACHER */}

      <Route
        path="/teacher"
        element={
          <ProtectedRoute role="teacher">

            <TeacherDashboard />

          </ProtectedRoute>
        }
      />

      {/* PARENT */}

      <Route
        path="/parent"
        element={
          <ProtectedRoute role="parent">

            <ParentDashboard />

          </ProtectedRoute>
        }
      />

      {/* STUDENTS */}

      <Route
        path="/students"
        element={
          <ProtectedRoute>

            <Students />

          </ProtectedRoute>
        }
      />

      {/* ATTENDANCE */}

      <Route
        path="/attendance"
        element={
          <ProtectedRoute>

            <Attendance />

          </ProtectedRoute>
        }
      />

      {/* MARKS */}

      <Route
        path="/marks"
        element={
          <ProtectedRoute>

            <Marks />

          </ProtectedRoute>
        }
      />

      {/* REPORTS */}

      <Route
        path="/reports"
        element={
          <ProtectedRoute>

            <Reports />

          </ProtectedRoute>
        }
      />

      {/* ADD STUDENT */}

      <Route
        path="/add-student"
        element={
          <ProtectedRoute role="admin">

            <AddStudent />

          </ProtectedRoute>
        }
      />

      {/* ADD TEACHER */}

      <Route
        path="/add-teacher"
        element={
          <ProtectedRoute role="admin">

            <AddTeacher />

          </ProtectedRoute>
        }
      />

      {/* ADD CLASS */}

      <Route
        path="/add-class"
        element={
          <ProtectedRoute role="admin">

            <AddClass />

          </ProtectedRoute>
        }
      />

      {/* MANAGE STUDENTS */}

      <Route
        path="/manage-students"
        element={
          <ProtectedRoute role="admin">

            <ManageStudents />

          </ProtectedRoute>
        }
      />

      {/* MANAGE TEACHERS */}

      <Route
        path="/manage-teachers"
        element={
          <ProtectedRoute role="admin">

            <ManageTeachers />

          </ProtectedRoute>
        }
      />

      {/* EDIT STUDENT */}

      <Route
        path="/edit-student/:id"
        element={
          <ProtectedRoute role="admin">

            <EditStudent />

          </ProtectedRoute>
        }
      />

      {/* INVALID ROUTE */}

      <Route
        path="*"
        element={<Navigate to="/" />}
      />

    </Routes>

  );

}

export default App;