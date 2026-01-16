import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Blog.css";

function Blog({ searchTerm = "" }) {

  const books = [
    { img: assets.history, title: "History" },
    { img: assets.Mystery, title: "Mystery" },
    { img: assets.Fantasy, title: "Fantasy" },
    { img: assets.Romance, title: "Romance Novel" },
    { img: assets.Comic, title: "Comics" },
    { img: assets.Thriller, title: "Thriller" },
    { img: assets.Children, title: "Children Books" },
    { img: assets.Drama, title: "Drama" },
  ];

  const secondBooks = [
    { img: assets.Fantasy, title: "Java Programming" },
    { img: assets.Romance, title: "React for Beginners" },
    { img: assets.Thriller, title: "Spring Boot Guide" },
    { img: assets.Children, title: "JavaScript Mastery" },
    { img: assets.Comic, title: "Data Structures in Java" },
    { img: assets.history, title: "SQL for " },
    { img: assets.Mystery, title: "Data Analytics" },
    { img: assets.Drama, title: "Frameworks" },
  ];

  // 🔍 Filter by search
  const filterBooks = (list) =>
    list.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // 🔗 Convert title to URL-safe slug
  const createSlug = (title) =>
    title.toLowerCase().replace(/\s+/g, "-");

  const renderCarousel = (booksArray) => (
    <div className="carousel-container">
      {booksArray.map((book) => (
        <div className="carousel-card" key={book.title}>
          <img src={book.img} alt={book.title} />
          <h2>{book.title}</h2>

          <Link to={`/category/${createSlug(book.title)}`}>
            <button className="see-more-btn">See More</button>
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <main className="carousel-section page-background">
      <h1 className="carousel-title">Explore Our Book Collection</h1>

      {filterBooks(books).length ? (
        renderCarousel(filterBooks(books))
      ) : (
        <p className="no-books">No books found</p>
      )}

      <h1 className="carousel-title" style={{ marginTop: "50px" }}>
        Programing Languages Books 
      </h1>

      {filterBooks(secondBooks).length ? (
        renderCarousel(filterBooks(secondBooks))
      ) : (
        <p className="no-books">No books found</p>
      )}
    </main>
  );
}

export default Blog;
