import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

/*
  Props:
  cartCount → number of cart items
  setSearchTerm → search handler from parent
*/

function Navbar({ cartCount = 0, setSearchTerm }) {

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const dropdownRef = useRef(null);
  const location = useLocation();

  /* 🔍 Search Handler */
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    if (setSearchTerm) {
      setSearchTerm(value);
    }
  };

  /* ✅ Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current &&
          !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ✅ Close dropdown on route change */
  useEffect(() => {
    setOpen(false);
  }, [location]);

  const userName = "Profile";

  return (
    <nav className="nav-bar">

      {/* 🔍 Search */}
      <div className="nav-left">
        <input
          type="text"
          placeholder="Search Book..."
          value={searchValue}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* ⭐ Logo */}
      <Link to="/" className="logo">
        <img
          src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
          alt="logo"
        />
        <h4>Books</h4>
      </Link>

      {/* ⭐ Right Section */}
      <div className="nav-right">

        <NavLink to="/oldbooks" className="nav-link-custom">
          Old Books
        </NavLink>

        <NavLink to="/newbooks" className="nav-link-custom">
          New Books
        </NavLink>

        {/* 🛒 Cart */}
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </Link>

        {/* 👤 Profile Dropdown */}
        <div className="account-dropdown" ref={dropdownRef}>
          <button
            className="account-btn"
            onClick={() => setOpen(!open)}
          >
            <FaUserCircle size={30} />
          </button>

          {open && (
            <ul className="account-menu">
              
              
              <li>
                <Link to="/registrationpage">Registration</Link>
              </li>
              <li>
                <Link to="/loginpage">LogIn</Link>
              </li>
            </ul>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;