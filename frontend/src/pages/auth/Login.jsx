import { useState } from "react";
import { loginUser } from "../../services/authService";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser(form);

    // ✅ Store token & role
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    alert("Login Success 🚀");

    // ✅ Redirect based on role
    if (res.data.role === "admin") {
      window.location.href = "/admin";
    } else if (res.data.role === "teacher") {
      window.location.href = "/teacher";
    } else {
      window.location.href = "/parent";
    }

  } catch (err) {
    alert("Login Failed ❌");
  }
};

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;