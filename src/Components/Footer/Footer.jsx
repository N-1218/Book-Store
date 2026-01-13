import React from "react";
import { assets } from "../../assets/assets";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and About Section */}
        <div className="footer-section">
          <img src={assets.Logo} alt="Book-IT Logo" className="footer-logo" />
          <h3>Books</h3>
          <p>
            Books is an online book store where users can search, add to cart,
            and purchase books easily.
          </p>
        </div>

        {/* Links Section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Book-IT</a></li>
            <li><a href="https://akshatjalan.github.io/akshat/">Website</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>📧 bookstore@gmail.com</p>
          <div className="social-links">
            <a href="https://github.com/Akshatjalan" target="_blank" rel="noreferrer">
              <span>🌐</span>
            </a>
            <a href="https://github.com/Akshatjalan" target="_blank" rel="noreferrer">
                <span>📸</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Made by <a href="#">Namrata Malusare</a></p>
      </div>
    </footer>
  );
}

export default Footer;