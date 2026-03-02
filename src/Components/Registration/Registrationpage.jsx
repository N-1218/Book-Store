import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Registration.css";

function Registrationpage() {

  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    subscribe: false,

    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    // Address fields
    if (["street", "city", "state", "pincode"].includes(name)) {
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    const { confirmPassword, ...dataToSend } = formData;

    try {

      await axios.post(
        "http://localhost:8080/user/register",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      alert("✅ Registration Successful!");
      navigate("/loginpage");

    } catch (error) {

      console.log(error);

      if (error.response) {
        alert(error.response.data);
      } else {
        alert("❌ Server Not Responding");
      }
    }
  };

  /* ================= UI ================= */

  return (
    <div className="registration-container">
      <div className="registration-card">

        <h2>📚 Book Store Registration</h2>

        <form onSubmit={handleSubmit}>

          {/* NAME */}
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

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* PHONE */}
          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          {/* PASSWORD */}
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

          {/* GENDER */}
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

          {/* STREET */}
          <input
            type="text"
            name="street"    
            placeholder="Street"
            value={formData.address.street}
            onChange={handleChange}
            required
          />

          {/* CITY STATE PINCODE */}
          <div className="form-row">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.address.state}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.address.pincode}
              onChange={handleChange}
              required
            />
          </div>

          {/* SUBSCRIBE */}
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