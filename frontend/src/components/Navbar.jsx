import { useNavigate } from "react-router-dom";

function Navbar({ title }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className="glass-card"
      style={{
        padding: "18px 24px",
        marginBottom: "24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap"
      }}
    >

      {/* Left */}

      <div>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600"
          }}
        >
          {title}
        </h2>

        <p
          style={{
            opacity: "0.7",
            marginTop: "4px",
            fontSize: "14px"
          }}
        >
          Welcome to Schoolways Management System
        </p>
      </div>

      {/* Right */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px"
        }}
      >

        {/* Profile */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}
        >

          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600"
            }}
          >
            A
          </div>

          <div>
            <h4
              style={{
                fontSize: "15px"
              }}
            >
              Admin
            </h4>

            <p
              style={{
                fontSize: "12px",
                opacity: "0.7"
              }}
            >
              schoolways@gmail.com
            </p>
          </div>

        </div>

        {/* Logout */}

        <button
          className="primary-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;