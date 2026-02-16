import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { assets } from "../../assets/assets";
import "./Navbar.css";

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
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ✅ Close dropdown on route change */
  useEffect(() => {
    setOpen(false);
  }, [location]);

  /* ✅ Example user name (later you can fetch from localStorage or backend) */
  const userName = "Profile";

  return (
    <nav className="nav-bar d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-light">

      {/* 🔍 Search */}
      <div className="d-flex align-items-center gap-3">
        <input
          type="text"
          placeholder="Search Book..."
          className="form-control form-control-sm"
          style={{ width: "220px" }}
          value={searchValue}
          onChange={handleSearch}
        />
      </div>

      {/* ⭐ Logo */}
      <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
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
      </Link>

      {/* ⭐ Right Section */}
      <div className="d-flex align-items-center gap-4 nav-right">

        <NavLink to="/blog" className="nav-link-custom">
          Old Books
        </NavLink>

        <NavLink to="/blog" className="nav-link-custom">
          New Books
        </NavLink>


        {/* 👤 Account Dropdown */}
        <div className="account-dropdown" ref={dropdownRef}>
          <button
            className="account-btn"
            onClick={() => setOpen(!open)}
          >
            <div className="profile-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>
          </button>

          {open && (
            <ul className="account-menu">
              <li>
                <Link to="/registrationpage">Registration</Link>
              </li>
              <li>
                <Link to="/loginpage">Logout</Link>
              </li>
            </ul>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
