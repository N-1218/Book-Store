import React from "react";
import { assets } from "../../assets/assets";
import "./Home.css";

function Home({ searchTerm = "" }) {

  // 📚 Book data
  const books = [
    { id: 1, title: "Java Programming" },
    { id: 2, title: "React for Beginners" },
    { id: 3, title: "Spring Boot Guide" },
    { id: 4, title: "JavaScript Mastery" },
    { id: 5, title: "Data Structures in Java" },
  ];

  // 🔍 Filter books safely
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="home-container page-background">

      {/* Header */}
      <header className="home-header">
        <h1 className="home-title">
          Explore the Best Book Stores in Pune – 2025
        </h1>

        <div className="home-meta">
          <span>📅 2025</span>
          <span>✍ Store Team</span>
          <span>📂 Blog Post</span>
        </div>
      </header>

     

      {/* Image Section */}
      <section className="home-image-section">
        <img
          src={assets?.bookstore ?? "/fallback-bookstore.jpg"}
          alt="Interior view of a popular bookstore in Pune"
          className="home-main-image"
          loading="lazy"
        />
      </section>

      {/* Content */}
      <section className="home-content">
        <p>
          Discover the most inspiring and cozy bookstores across Pune, where
          every shelf tells a story.
        </p>
        <p>
          From rare vintage collections to modern bestsellers, Pune’s vibrant
          book culture has something special waiting for you.
        </p>
      </section>


    </main>
  );
}

export default Home;
