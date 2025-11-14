import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function LoginPage() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🧠 Get registered user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("⚠️ No registered user found. Please register first!");
      navigate("/registrationpage");
      return;
    }

    // ✅ Validate email & password
    if (
      loginData.email === storedUser.email &&
      loginData.password === storedUser.password
    ) {
      alert(`Successful Login ✅ Welcome back, ${storedUser.firstName}!`);
      navigate("/"); // 👉 Redirect to App.jsx main page
    } else {
      alert("❌ Invalid Email or Password!");
    }
  };

  return (<>
  <Navbar />
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
  </>);
}

export default LoginPage;
