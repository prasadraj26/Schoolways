import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

  // Get user role from localStorage
  const userRole = localStorage.getItem("role");

  // If no role → not logged in
  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  // If role required but doesn't match
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  // Allow access
  return children;
}

export default ProtectedRoute;