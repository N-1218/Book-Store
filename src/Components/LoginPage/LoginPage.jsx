import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function LoginPage() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  /* Handle Input Change */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* Handle Login Submit */
  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");

    // If user not registered
    if (!storedUser) {
      alert("⚠️ No registered user found. Please register first!");
      navigate("/registrationpage");
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    // Login validation
    if (
      loginData.email === parsedUser.email &&
      loginData.password === parsedUser.password
    ) {
      alert(`Successful Login ✅ Welcome back, ${parsedUser.firstName}!`);

      // ✅ Correct Route
      navigate("/customer-dashboard");
    } else {
      alert("❌ Invalid Email or Password!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p>Please login to your account</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={loginData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={loginData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="signup-btn">
            Login
          </button>
        </form>

        <p className="link-text">
          Don't have an account?{" "}
          <Link to="/registrationpage" className="link">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
