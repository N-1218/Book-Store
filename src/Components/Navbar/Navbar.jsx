import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ cartCount = 0, setSearchTerm }) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const dropdownRef = useRef(null);
  const location = useLocation();

  // Search input handler
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    if (setSearchTerm) setSearchTerm(value);
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <nav className="nav-bar">
      {/* Left: Search */}
      <div className="nav-left">
        <input
          type="text"
          placeholder="Search Book..."
          value={searchValue}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* Logo */}
      <Link to="/" className="logo">
        <img
          src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
          alt="logo"
        />
        <h4>Books</h4>
      </Link>

      {/* Right Section */}
      <div className="nav-right">
        <NavLink
          to="/"
          className="nav-link-custom"
          onClick={() => setSearchTerm("")} // Reset search when clicking Books
        >
          Books
        </NavLink>

        <NavLink
          to="/#contact"
          className="nav-link-custom"
          onClick={() => {
            const section = document.getElementById("contact-section");
            if (section) section.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Contact Us
        </NavLink>

        {/* Cart */}
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart size={22} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>

        {/* Profile Dropdown */}
        <div className="account-dropdown" ref={dropdownRef}>
          <button className="account-btn" onClick={() => setOpen(!open)}>
            <FaUserCircle size={30} />
          </button>

          {open && (
            <ul className="account-menu">
              <li><Link to="/registrationpage">Registration</Link></li>
              <li><Link to="/loginpage">LogIn</Link></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;