import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function LoginPage() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    // Frontend validation
    if (!loginData.email || !loginData.password) {
      setMessage("❌ Please enter email and password");
      return;
    }

    setMessage("⏳ Authenticating...");

    try {

      const response = await axios.post(
        "http://localhost:8080/user/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const user = response.data;

      // Save user info
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user.id);
      localStorage.setItem("isLoggedIn", "true");

      setMessage("✅ Login Successful");

      // Redirect after login
      setTimeout(() => {
        navigate("/customer-dashboard");
      }, 1000);

    } catch (error) {

      console.error("Login Error:", error);

      if (error.response) {
        setMessage(`❌ ${error.response.data}`);
      } 
      else if (error.request) {
        setMessage("❌ Server not responding. Check backend.");
      } 
      else {
        setMessage("❌ Something went wrong");
      }

    }

  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2>Login</h2>

        {message && (
          <p className={`form-message ${message.includes("✅") ? "success" : "error"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={loginData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={loginData.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>

        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/registrationpage">Register</Link>
        </p>

      </div>

    </div>
  );
}

export default LoginPage;