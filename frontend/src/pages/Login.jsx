import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { School, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const uid = userCredential.user.uid;
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        alert("User data not found");
        return;
      }

      const userData = userSnap.data();
      const role = userData.role;

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "teacher") {
        navigate("/teacher");
      } else if (role === "parent") {
        navigate("/parent");
      } else {
        alert("Invalid user role");
      }
    } catch (error) {
      console.log(error);
      alert("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--navy-subtle)",
      padding: "20px"
    }}>
      <div className="card" style={{
        width: "100%",
        maxWidth: "960px",
        display: "flex",
        overflow: "hidden",
        minHeight: "540px"
      }}>
        {/* Left Side: Solid Navy Brand Panel */}
        <div style={{
          flex: "1",
          background: "var(--navy)",
          color: "var(--white)",
          padding: "48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "36px" }}>
              <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <School size={26} color="#FFFFFF" />
              </div>
              <span style={{ fontSize: "24px", fontWeight: "700", letterSpacing: "-0.02em" }}>
                Schoolways
              </span>
            </div>

            <h1 style={{ fontSize: "32px", fontWeight: "700", lineHeight: "1.2", marginBottom: "16px" }}>
              Smart School Management System
            </h1>

            <p style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "15px", lineHeight: "1.6" }}>
              Streamline attendance, marks, analytics, and school operations through one central portal.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255, 255, 255, 0.7)", fontSize: "13px" }}>
            <ShieldCheck size={18} />
            <span>Secure Enterprise Authentication</span>
          </div>
        </div>

        {/* Right Side: Clean White Form Panel */}
        <div style={{
          flex: "1",
          background: "var(--white)",
          padding: "48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--navy)", marginBottom: "8px" }}>
              Sign In
            </h2>
            <p style={{ fontSize: "14px", color: "var(--navy-muted)" }}>
              Enter your credential to access your dashboard
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  name="email"
                  placeholder="name@schoolways.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "42px" }}
                />
                <Mail size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--navy-muted)" }} />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "42px" }}
                />
                <Lock size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--navy-muted)" }} />
              </div>
            </div>

            <button
              type="submit"
              className="primary-btn"
              style={{ width: "100%", marginTop: "12px", height: "48px" }}
              disabled={loading}
            >
              {loading ? "Logging in..." : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;