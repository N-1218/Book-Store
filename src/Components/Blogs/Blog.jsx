import React, { useRef, useState } from "react";
import { assets } from "../../assets/assets";
import "./Blog.css";

function Blog({ setCartCount = () => {}, searchTerm = "" }) {
  const firstCarouselRef = useRef(null);
  const secondCarouselRef = useRef(null);
  const [quantities, setQuantities] = useState({});

  const books = [
    { img: assets.history, title: "History", author: "Jojo Moyes", price: 340 },
    { img: assets.Mystery, title: "Mystery", author: "Elizabeth Gilbert", price: 450 },
    { img: assets.Fantasy, title: "Fantasy", author: "Ruth Ozeki", price: 175 },
    { img: assets.Romance, title: "Romance Novel", author: "F. Scott Fitzgerald", price: 665 },
    { img: assets.Comic, title: "Comics", author: "Stan Lee", price: 520 },
    { img: assets.Thriller, title: "Thriller", author: "James Patterson", price: 375 },
    { img: assets.Children, title: "Children's Books", author: "J.K. Rowling", price: 299 },
    { img: assets.Drama, title: "Drama", author: "Elizabeth Gilbert", price: 310 },
  ];

  // Example second carousel books
  const secondBooks = [
    { img: assets.Fantasy, title: "Fantasy", author: "Ruth Ozeki", price: 175 },
    { img: assets.Romance, title: "Romance Novel", author: "F. Scott Fitzgerald", price: 665 },
    { img: assets.Thriller, title: "Thriller", author: "James Patterson", price: 375 },
    { img: assets.Children, title: "Children's Books", author: "J.K. Rowling", price: 299 },
     { img: assets.Comic, title: "Comics", author: "Stan Lee", price: 520 },
      { img: assets.history, title: "History", author: "Jojo Moyes", price: 340 },
    { img: assets.Mystery, title: "Mystery", author: "Elizabeth Gilbert", price: 450 },
      { img: assets.Drama, title: "Drama", author: "Elizabeth Gilbert", price: 310 },
  ];

  // Filter books by search term
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSecondBooks = secondBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const increaseQty = (title) => {
    setQuantities((prev) => ({ ...prev, [title]: (prev[title] || 0) + 1 }));
    setCartCount((count) => count + 1);
  };

  const decreaseQty = (title) => {
    setQuantities((prev) => {
      const val = prev[title] || 0;
      if (val > 0) setCartCount((count) => Math.max(0, count - 1));
      return { ...prev, [title]: Math.max(0, val - 1) };
    });
  };

  const renderCarousel = (booksArray, ref) => (
    <div className="carousel-container" ref={ref}>
      {booksArray.map((book) => (
        <div className="carousel-card" key={book.title}>
          <img src={book.img} alt={book.title} />
          <h2>{book.title}</h2>
          <p className="author">by {book.author}</p>
          <p className="price">₹ {book.price}</p>

          <div className="quantity-controls">
            <button onClick={() => decreaseQty(book.title)}>-</button>
            <span>{quantities[book.title] || 0}</span>
            <button onClick={() => increaseQty(book.title)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <main className="carousel-section page-background">
      <h1 className="carousel-title">Explore Our Book Collection</h1>
      {filteredBooks.length > 0 ? renderCarousel(filteredBooks, firstCarouselRef) : <p className="no-books">No books found</p>}

      <h1 className="carousel-title" style={{ marginTop: "50px" }}>Popular Picks</h1>
      {filteredSecondBooks.length > 0 ? renderCarousel(filteredSecondBooks, secondCarouselRef) : <p className="no-books">No books found</p>}
    </main>
  );
}

export default Blog;
