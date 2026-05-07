import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";

import AdminDashboard
  from "./pages/AdminDashboard";

import TeacherDashboard
  from "./pages/TeacherDashboard";

import ParentDashboard
  from "./pages/ParentDashboard";

import Students
  from "./pages/Students";

import Attendance
  from "./pages/Attendance";

import Marks
  from "./pages/Marks";

import Reports
  from "./pages/Reports";

import ProtectedRoute
  from "./components/ProtectedRoute";

function App() {

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

      {/* INVALID ROUTES */}

      <Route
        path="*"
        element={<Navigate to="/" />}
      />

    </Routes>

  );

}

export default App;