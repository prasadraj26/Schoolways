import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "admin"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // TEMP LOGIN LOGIC
    localStorage.setItem("role", formData.role);

    // Redirect based on role
    if (formData.role === "admin") {
      navigate("/admin");
    } else if (formData.role === "teacher") {
      navigate("/teacher");
    } else {
      navigate("/parent");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >

      <div
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "40px"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "34px",
            fontWeight: "700"
          }}
        >
          Schoolways
        </h1>

        <p
          style={{
            textAlign: "center",
            opacity: "0.8",
            marginBottom: "30px"
          }}
        >
          Smart School Management System
        </p>

        <form onSubmit={handleLogin}>

          {/* Email */}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}

          <div className="form-group">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
            </select>
          </div>

          {/* Button */}

          <button
            type="submit"
            className="primary-btn"
            style={{
              width: "100%",
              marginTop: "10px"
            }}
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;