import React from "react";
import { assets } from "../../assets/assets";
import './Home.css';

function Home() {
  return (
    
    <main className="home-container page-background">
      {/* Header */}
      <header className="home-header">
        <h1 className="home-title">
          Explore the Best Book Stores in Pune – 2025
        </h1>

        <div className="home-meta">
          <span>
            <i className="fa-regular fa-clock" aria-hidden={true}></i>
            <span className="sr-only">Published Year:</span> 2025
          </span>

          <span>
            <i className="fa-regular fa-user" aria-hidden={true}></i>
            <span className="sr-only">Author:</span> Store Team
          </span>

          <span>
            <i className="fa-solid fa-folder" aria-hidden={true}></i>
            <span className="sr-only">Category:</span> Blog Post
          </span>
        </div>
      </header>

      {/* Image Section */}
      <section className="home-image-section">
        <img
          src={assets?.bookstore || "/fallback-bookstore.jpg"}
          alt="Interior view of a popular bookstore in Pune"
          className="home-main-image"
          loading="lazy"
        />
      </section>

      {/* Content */}
      <section className="home-content">
        <p>
          Discover the most inspiring and cozy bookstores across Pune, where
          every shelf tells a story. From rare vintage collections to modern
          bestsellers, these bookstores offer a perfect escape for every book
          lover.
        </p>

        <p>
          Whether you enjoy fiction, non-fiction, academic reads, or children’s
          books, Pune’s vibrant book culture has something special waiting for
          you.
        </p>
      </section>
    </main>
   
  );
  
}

export default Home;
