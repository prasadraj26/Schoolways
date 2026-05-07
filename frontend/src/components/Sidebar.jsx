import { Link, useLocation } from "react-router-dom";

function Sidebar({ role }) {

  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path:
        role === "admin"
          ? "/admin"
          : role === "teacher"
          ? "/teacher"
          : "/parent"
    },
    {
      name: "Students",
      path: "/students"
    },
    {
      name: "Attendance",
      path: "/attendance"
    },
    {
      name: "Marks",
      path: "/marks"
    },
    {
      name: "Reports",
      path: "/reports"
    }
  ];

  return (
    <div
      className="glass-card"
      style={{
        width: "260px",
        minHeight: "100vh",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        position: "sticky",
        top: 0
      }}
    >

      {/* Logo */}

      <div>

        <h1
          style={{
            fontSize: "30px",
            fontWeight: "700"
          }}
        >
          Schoolways
        </h1>

        <p
          style={{
            opacity: "0.7",
            marginTop: "4px",
            fontSize: "14px"
          }}
        >
          School Management System
        </p>

      </div>

      {/* Navigation */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "20px"
        }}
      >

        {menuItems.map((item, index) => {

          const isActive =
            location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              style={{
                padding: "14px 18px",
                borderRadius: "14px",
                background: isActive
                  ? "#2563eb"
                  : "rgba(255,255,255,0.05)",
                transition: "0.3s",
                fontWeight: "500"
              }}
            >
              {item.name}
            </Link>
          );
        })}

      </div>

    </div>
  );
}

export default Sidebar;