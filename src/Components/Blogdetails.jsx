import React from "react";
import { assets } from "../assets/assets.js";


const BlogDetails = () => {
  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1 className="blog-title">
          Explore the Best Book Stores in Pune 2025 Today
        </h1>
        <div className="blog-meta">
          <span><i className="fa fa-clock"></i> 2025</span>
          <span><i className="fa fa-user"></i> Store Team</span>
          <span><i className="fa fa-folder"></i> Blog-Post</span>
        </div>
      </header>

      {/* Blog Image Section */}
      <section className="blog-image-section">
        <img src={assets.bookstore} alt="Bookstore in Pune" className="blog-main-image" />
      </section>

      {/* Blog content placeholder */}
      <section className="blog-content">
        <p>
          Discover the most inspiring and cozy bookstores across Pune, where every shelf 
          tells a story. From vintage collections to modern novels — find your next read today!
        </p>
      </section>
    </div>
  );
};

export default BlogDetails;
