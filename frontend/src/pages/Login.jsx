import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  doc,
  getDoc
} from "firebase/firestore";

import {
  auth,
  db
} from "../firebase/firebase";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: ""
    });

  const [loading, setLoading] =
    useState(false);

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  // =========================
  // LOGIN
  // =========================

  const handleLogin =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        // FIREBASE LOGIN

        const userCredential =
          await signInWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
          );

        const uid =
          userCredential.user.uid;

        // FETCH USER ROLE

        const userRef =
          doc(db, "users", uid);

        const userSnap =
          await getDoc(userRef);

        if (!userSnap.exists()) {

          alert(
            "User data not found"
          );

          return;

        }

        const userData =
          userSnap.data();

        const role =
          userData.role;

        // ROLE BASED REDIRECT

        if (role === "admin") {

          navigate("/admin");

        }

        else if (
          role === "teacher"
        ) {

          navigate("/teacher");

        }

        else if (
          role === "parent"
        ) {

          navigate("/parent");

        }

        else {

          alert(
            "Invalid user role"
          );

        }

      }

      catch (error) {

        console.log(error);

        alert(
          "Invalid Email or Password"
        );

      }

      finally {

        setLoading(false);

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

        <form
          onSubmit={handleLogin}
        >

          {/* EMAIL */}

          <div className="form-group">

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* PASSWORD */}

          <div className="form-group">

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="primary-btn"
            style={{
              width: "100%",
              marginTop: "10px"
            }}
            disabled={loading}
          >

            {
              loading
                ? "Logging in..."
                : "Login"
            }

          </button>

        </form>

      </div>

    </div>

  );

}

export default Login;