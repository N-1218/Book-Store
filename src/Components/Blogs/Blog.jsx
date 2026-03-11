import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./Blog.css";

function Blog({ searchTerm = "" }) {
  const carouselRef = useRef(null);
  const sectionRef = useRef(null);
  const [books, setBooks] = useState([]);
  const [animate, setAnimate] = useState(false);

  // Fetch books dynamically
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/book/all");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error.message);
        setBooks([]); // Show empty if API fails
      }
    };
    fetchBooks();
  }, []);

  // Intersection observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setAnimate(true);
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Filter books based on searchTerm
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main ref={sectionRef} className="carousel-section page-background">
      <h1 className="carousel-title">Available Books</h1>
      <div className="carousel-container" ref={carouselRef}>
        {filteredBooks.length === 0 ? (
          <p className="no-books">No books found</p>
        ) : (
          filteredBooks.map((book) => (
            <BookCard key={book.bookId} book={book} animate={animate} />
          ))
        )}
      </div>
    </main>
  );
}

// Book card
function BookCard({ book, animate }) {
  const [qty, setQty] = useState(0);

  const increaseQty = () => setQty(qty + 1);
  const decreaseQty = () => setQty(qty > 0 ? qty - 1 : 0);

  const buyBook = () => {
    if (qty === 0) {
      alert("Please add quantity first");
      return;
    }
    alert(`Purchased ${qty} copy of ${book.title}\nTotal ₹${qty * book.price}`);
  };

  const totalPrice = qty > 0 ? qty * book.price : book.price;

  return (
    <div className={`carousel-card ${animate ? "animate-card" : ""}`}>
      <div className="discount-badge">Bestseller</div>
      <div className="image-wrapper">
        <img
          src={book.imageUrl ? `http://localhost:8080/uploads/${book.imageUrl}` : "placeholder.jpg"}
          alt={book.title}
        />
      </div>
      <h2>{book.title}</h2>
      <div className="rating">⭐⭐⭐⭐☆</div>
      <p className="price">₹{totalPrice}</p>
      <div className="qty-controls">
        <button onClick={decreaseQty}>-</button>
        <span>{qty}</span>
        <button onClick={increaseQty}>+</button>
      </div>
      <button className="buy-btn" onClick={buyBook}>
        Buy Now
      </button>
    </div>
  );
}

export default Blog;