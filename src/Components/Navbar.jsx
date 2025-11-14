import React from "react";
import { Link } from "react-router-dom";

function Navbar({ cartCount = 0, setSearchTerm }) {
  // 🔍 Handle search input
  const handleSearch = (e) => {
    if (setSearchTerm) {
      setSearchTerm(e.target.value.toLowerCase());
    }
  };

  return (
    <nav className="nav-bar d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-light">
      {/* Left Section */}
      <div className="d-flex align-items-center gap-3">
        {/* 🔍 Search Input */}
        <input
          type="text"
          placeholder="Search Book..."
          className="form-control form-control-sm"
          style={{ width: "220px" }}
          onChange={handleSearch}
        />
      </div>

      {/* Logo */}
      <div className="d-flex align-items-center gap-2">
        <img
          src="src/assets/logo.jpg"
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
      <div className="d-flex align-items-center gap-4">
        <Link
            to="/contact"
            className="text-dark fw-semibold text-decoration-none">
            Contact Us
        </Link>


        {/* 🛒 Cart Icon */}
        <div
          className="position-relative"
          title="Cart"
          style={{ cursor: "pointer" }}
        >
          <i className="material-icons" style={{ fontSize: "26px" }}>
            shopping_cart
          </i>
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-6px",
                right: "-10px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "11px",
                fontWeight: "bold",
              }}
            >
              {cartCount}
            </span>
          )}
        </div>

        {/* 👤 Account Dropdown */}
        <div className="dropdown">
          <Link
            className="nav-link dropdown-toggle text-dark"
            to="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons" style={{ fontSize: "28px" }}>
              account_circle
            </i>
          </Link>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link className="dropdown-item" to="/registrationpage">
                Registration
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/loginpage">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
