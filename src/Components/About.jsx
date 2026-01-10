import React from "react";
import { FaTruck, FaStar, FaUsers, FaLightbulb, FaSyncAlt } from "react-icons/fa";
import Navbar from "./Navbar";
import { assets } from "../assets/assets";
import './About.css';

function About() {
  return (
    <main className="main">
        <h1 className="carousel-title">Discover Our Journey</h1>
    <div className="features">
      <div className="feature">
        <FaTruck className="icon" />
        <p>4–5 Days Express Delivery</p>
      </div>
      <div className="feature">
        <FaStar className="icon" />
        <p>100% Authentic Products</p>
      </div>
      <div className="feature">
        <FaUsers className="icon" />
        <p>1 Lakh + Happy Readers</p>
      </div>
      <div className="feature">
        <FaLightbulb className="icon" />
        <p>Expertly Curated</p>
      </div>
      <div className="feature">
        <FaSyncAlt className="icon" />
        <p>Easy Return & Prompt Support</p>
      </div>
    </div>
    </main>
  );
}

export default About;
