import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  GraduationCap,
  FileText,
  School,
  X
} from "lucide-react";

function Sidebar({ role, isOpen, onClose }) {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path:
        role === "admin"
          ? "/admin"
          : role === "teacher"
          ? "/teacher"
          : "/parent",
      icon: LayoutDashboard
    },
    {
      name: "Students",
      path: "/students",
      icon: Users
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: CalendarCheck
    },
    {
      name: "Marks",
      path: "/marks",
      icon: GraduationCap
    },
    {
      name: "Reports",
      path: "/reports",
      icon: FileText
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="mobile-drawer-overlay"
          onClick={onClose}
        />
      )}

      <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
        {/* Header & Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff"
            }}>
              <School size={22} />
            </div>
            <div>
              <h1 className="sidebar-logo-title">Schoolways</h1>
              <p className="sidebar-logo-subtitle">Management System</p>
            </div>
          </div>

          {/* Close button for mobile drawer */}
          <button
            onClick={onClose}
            className="mobile-menu-btn"
            style={{ display: isOpen ? "flex" : "none", color: "#ffffff", background: "rgba(255,255,255,0.1)", border: "none" }}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="sidebar-nav-list">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;

            return (
              <Link
                key={index}
                to={item.path}
                className={`sidebar-nav-item ${isActive ? "active" : ""}`}
                onClick={() => onClose && onClose()}
              >
                <IconComponent size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Sidebar;