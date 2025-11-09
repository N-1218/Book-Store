import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";


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
      <div className="logo d-flex align-items-center gap-2">
       <img src="src/assets/logo.jpg" alt="Readbooks Logo" className="logo-img" />
       <h3 className="mb-0">Books</h3>
      </div>


      {/* Right Section */}
      <div className="icon-about d-flex align-items-center gap-3">
        <Link to="./Components/About.jsx" className="me-3">
          About Us
        </Link>

        {/* Wishlist and Cart Icons */}
        <div className="icon-group d-flex align-items-center gap-3">
          <div className="icon wishlist" title="Wishlist">
            <i className="material-icons">favorite_border</i>
          </div>
          <div className="icon cart" title="Cart">
            <i className="material-icons">shopping_cart</i>
          </div>
        </div>

        {/* Account Dropdown */}
        <div className="dropdown ms-3">
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
              <Link className="dropdown-item" to="/RegistrationPage">
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
