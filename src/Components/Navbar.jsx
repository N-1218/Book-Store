import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav-bar d-flex justify-content-between align-items-center p-2">
      {/* Left Section */}
      <div className="nav1 d-flex align-items-center">
        <Link to="#" className="me-3">
          Browse Categories
        </Link>
        <input
          type="text"
          id="search_book"
          placeholder="Search Book"
          className="form-control"
        />
      </div>

      {/* Logo Section */}
      <div className="logo">
        <h3 className="mb-0">readbooks</h3>
      </div>

      {/* Right Section */}
      <div className="icon-about d-flex align-items-center">
        <Link to="/about" className="me-3">
          About Us
        </Link>

        <div className="dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">account_circle</i>
          </Link>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link className="dropdown-item" to="/login">
                Registration
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/register">
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
