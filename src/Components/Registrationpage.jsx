import React, { useState } from "react";
import Navbar from "./Navbar";

function RegistrationPage() {
  const [formData, setFormData] = useState({
    firstName: "Admin",
    lastName: "Admin",
    email: "Admin@gmail.com",
    password: "******",
    subscribe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Welcome ${formData.firstName}! Your Registration is Successful....!");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Sign Up Now</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="checkbox-row">
            <input
              type="checkbox"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
            />
            <label>Subscribe to our newsletter</label>
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <div className="social-login">
          <p>Or sign up with:</p>
          <div className="social-icons">
            <span>🌐</span>
            <span>🐦</span>
            <span>📘</span>
            <span>💻</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
