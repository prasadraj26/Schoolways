import { Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuth";

function ProtectedRoute({ children, role }) {
  const { user, role: userRole, loading } = useAuthStore();

  // If still checking auth state, show loader
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-glass-base">
        <div className="w-16 h-16 border-4 border-navy-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If a specific role is required and user role doesn't match
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  // Allow access
  return children;
}

export default ProtectedRoute;