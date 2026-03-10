import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Registration.css";

function Registrationpage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: "",
    subscribe: false,
    street: "",
    city: "",
    state: "",
    country: "India",
    pincode: ""
  });

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match");
      return;
    }

    try {

      const { confirmPassword, ...dataToSend } = formData;

      const response = await axios.post(
        "http://localhost:8080/user/register",
        dataToSend
      );

      console.log(response.data);

      alert("✅ Registration Successful!");
      navigate("/loginpage");

    } catch (error) {

      console.error(error);

      if (error.response) {
        alert(error.response.data);
      } else {
        alert("❌ Server Not Responding");
      }
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">

        <h2>📚 Book Store Registration</h2>

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
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>

          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
            />
            <label>Subscribe for book offers & discounts</label>
          </div>

          <button type="submit" className="signup-btn">
            Create Account
          </button>

        </form>

      </div>
    </div>
  );
}

export default Registrationpage;