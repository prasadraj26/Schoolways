import { useNavigate } from "react-router-dom";
import { Menu, LogOut, User } from "lucide-react";

function Navbar({ title, onToggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar-container">
      {/* Left side: Mobile Toggle + Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {onToggleSidebar && (
          <button
            className="mobile-menu-btn"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation menu"
          >
            <Menu size={20} />
          </button>
        )}

        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "700", color: "var(--navy)", letterSpacing: "-0.01em" }}>
            {title}
          </h2>
          <p style={{ fontSize: "12px", color: "var(--navy-muted)", marginTop: "2px" }}>
            Schoolways Management System
          </p>
        </div>
      </div>

      {/* Right side: Profile & Logout */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="navbar-profile-avatar">
            <User size={18} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--navy)", lineHeight: "1.2" }}>
              User Account
            </span>
            <span style={{ fontSize: "11px", color: "var(--navy-muted)" }}>
              Active Session
            </span>
          </div>
        </div>

        <button className="secondary-btn" onClick={handleLogout} style={{ padding: "8px 14px", fontSize: "13px" }}>
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;