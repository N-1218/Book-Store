import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { assets } from "../../../assets/assets";
import "../../Navbar/Navbar.css"; // ✅ Uncommented and fixed path to share CSS

function Login_Navbar({ cartCount = 0, setSearchTerm, onLogout }) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);

  // 🔍 Handle search logic
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    if (setSearchTerm) setSearchTerm(value);
  };

  // 🚪 Handle Logout
  const handleLogoutClick = () => {
    setOpen(false);
    if (onLogout) {
      onLogout(); // ✅ This triggers the handleLogout in App.jsx
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
      
      {/* Left: Search Bar (Visible after login) */}
      <div className="d-flex align-items-center gap-3">
        <input
          type="text"
          placeholder="Search your library..."
          className="form-control form-control-sm"
          style={{ width: "220px" }}
          value={searchValue}
          onChange={handleSearch}
        />
      </div>

      {/* Center: Logo */}
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

      {/* Right: Cart and Account */}
      <div className="d-flex align-items-center gap-4 nav-right">
        
        <Link to="/Blog" className="text-dark fw-semibold text-decoration-none d-none d-md-block">
          Old Books
        </Link>
        <Link to="/Blog" className="text-dark fw-semibold text-decoration-none d-none d-md-block">
          New Books
        </Link>

        {/* 🛒 Cart Icon - Only active when logged in */}
        <Link to="/cart" className="position-relative text-dark text-decoration-none">
          <FaShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
              {cartCount}
            </span>
          )}
        </Link>

        {/* 👤 Account Dropdown */}
        <div className="account-dropdown position-relative" ref={dropdownRef}>
          <button
            className="btn btn-link text-dark p-0 border-0"
            onClick={() => setOpen(!open)}
            aria-haspopup="true"
            aria-expanded={open}
          >
            <FaUser size={20} />
          </button>

          {open && (
            <ul className="dropdown-menu show position-absolute end-0 mt-2 shadow-sm" style={{ right: 0, minWidth: '160px' }}>
              <li className="px-3 py-2 border-bottom d-md-none text-muted small">
                Menu
              </li>
              <li>
                <Link className="dropdown-item" to="/Profile" onClick={() => setOpen(false)}>
                  My Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/history" onClick={() => setOpen(false)}>
                  Order History
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item text-danger fw-bold" onClick={handleLogoutClick}>
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Login_Navbar;