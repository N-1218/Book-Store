import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { assets } from "../../assets/assets";
import "./Navbar.css";

function Navbar({ cartCount = 0, setSearchTerm }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 🔍 Handle search
  const handleSearch = (e) => {
    if (setSearchTerm) {
      setSearchTerm(e.target.value.toLowerCase());
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="nav-bar d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-light">
      
      {/* Left: Search */}
      <div className="d-flex align-items-center gap-3">
        <input
          type="text"
          placeholder="Search Book..."
          className="form-control form-control-sm"
          style={{ width: "220px" }}
          onChange={handleSearch}
        />
      </div>

      {/* Center: Logo */}
      <div className="d-flex align-items-center gap-2">
        <img
          src={assets.Logo}
          alt="Books Logo"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <h4 className="mb-0 fw-bold text-primary">Books</h4>
      </div>

      {/* Right Section */}
      <div className="d-flex align-items-center gap-4 nav-right ">
        <Link
          to="/Contact"
          className="text-dark fw-semibold text-decoration-none"
        >
          Contact Us
        </Link>

        {/* 🛒 Cart */}
       <div className="position-relative">
  <FaShoppingCart className="material-icons" />
  {cartCount > 0 && (
    <span className="cart-badge">{cartCount}</span>
  )}
</div>


        {/* 👤 Account Dropdown (Merged) */}
       {/* 👤 Account Dropdown */}
<div className="account-dropdown" ref={dropdownRef}>
  <button
    className="account-btn"
    onClick={() => setOpen(!open)}
    aria-expanded={open}
  >
    <FaUser className="material-icons" />
  </button>

  {open && (
    <ul className="account-menu">
      <li>
        <Link to="/RegistrationPage" onClick={() => setOpen(false)}>
          Registration
        </Link>
      </li>
      <li>
        <Link to="/LoginPage" onClick={() => setOpen(false)}>
          Login
        </Link>
      </li>
    </ul>
  )}
</div>

      </div>
    </nav>
  );
}

export default Navbar;
