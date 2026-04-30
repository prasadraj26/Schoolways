import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import TeacherDashboard from "./pages/teacher/Dashboard";
import ParentDashboard from "./pages/parent/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/parent" element={<ParentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;