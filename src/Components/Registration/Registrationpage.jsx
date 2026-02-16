import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './Registration.css';

function Registrationpage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "",   // ✅ Added dropdown state
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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

    localStorage.setItem("user", JSON.stringify(formData));

    alert(`✅ Welcome ${formData.firstName}! Registration Successful 🎉`);
    navigate("/LoginPage");
  };

  return (
    <>
      <div className="registration-container">
        <div className="registration-card">
          <h2>Create Your Account</h2>

          <form onSubmit={handleSubmit}>

            {/* ✅ Dropdown Added */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="dropdown"
            >
              <option value="">Select Role</option>
              <option value="Student">Customer</option>
              <option value="Teacher">Seller</option>
              <option value="Admin">Admin</option>
            </select>

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
              Register
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default Registrationpage;
