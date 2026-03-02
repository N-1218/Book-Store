import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function LoginPage() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  /* ================= INPUT CHANGE ================= */

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= LOGIN ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {

      const response = await axios.post(
        "http://localhost:8080/user/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // ✅ important for CORS + Spring Security
        }
      );

      // ✅ Save user data
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("isLoggedIn", "true");

      setMessage("✅ Login Successful");

      setTimeout(() => {
        navigate("/customer-dashboard");
      }, 1000);

    } catch (error) {

      console.log(error);

      if (error.response) {
        setMessage(error.response.data || "Login Failed");
      } else {
        setMessage("❌ Server Not Responding");
      }
    }
  };

  /* ================= UI ================= */

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Login</h2>

        {message && <p className="form-message">{message}</p>}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>

        </form>

        <p>
          Don't have an account?
          <Link to="/registrationpage"> Register</Link>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;