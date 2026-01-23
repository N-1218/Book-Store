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

  const programmingBooks = [
    { img: assets.Java, title: "Java Programming" },
    { img: assets.React, title: "React for Beginners" },
    { img: assets.Springboot, title: "Spring Boot Guide" },
    { img: assets.JS, title: "JavaScript Mastery" },
    { img: assets.Comic, title: "Data Structures in Java" },
    { img: assets.history, title: "SQL for Beginners" },
    { img: assets.Mystery, title: "Data Analytics" },
    { img: assets.Drama, title: "Frameworks" },
  ];

  // 🔍 Search filter
  const filterBooks = (list) => {
    if (!searchTerm) return list;

    return list.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredBooks = filterBooks(books);
  const filteredProgrammingBooks = filterBooks(programmingBooks);

  // 🔗 Slug
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

      {filteredBooks.length ? (
        renderCarousel(filteredBooks)
      ) : (
        <p className="no-books">No books found</p>
      )}

      <h1 className="carousel-title" style={{ marginTop: "50px" }}>
        Programming Language Books
      </h1>

      {filteredProgrammingBooks.length ? (
        renderCarousel(filteredProgrammingBooks)
      ) : (
        <p className="no-books">No books found</p>
      )}
    </main>
  );
}

export default Blog;
