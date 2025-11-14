import React, { useRef, useState } from "react";
import { assets } from "../assets/assets";

function Home({ setCartCount, searchTerm }) {
  const carouselRef = useRef(null);

  const books = [
    { img: assets.history, title: "History", author: "Jojo Moyes", desc: "Historical stories.", rating: 4.5, price: 340 },
    { img: assets.Mystery, title: "Mystery", author: "Elizabeth Gilbert", desc: "Thrilling mysteries.", rating: 4.8, price: 450 },
    { img: assets.Fantasy, title: "Fantasy", author: "Ruth Ozeki", desc: "Magical adventures.", rating: 4.3, price: 175 },
    { img: assets.Romance, title: "Romance Novel", author: "F. Scott Fitzgerald", desc: "Heartfelt stories.", rating: 4.9, price: 665 },
    { img: assets.Comic, title: "Comics", author: "Stan Lee", desc: "Fun superhero tales.", rating: 4.6, price: 520 },
    { img: assets.Thriller, title: "Thriller", author: "James Patterson", desc: "Fast-paced thrillers.", rating: 4.4, price: 375 },
    { img: assets.Children, title: "Children's Books", author: "J.K. Rowling", desc: "Great for young readers.", rating: 4.7, price: 299 },
    { img: assets.Drama, title: "Drama", author: "Elizabeth Gilbert", desc: "Deep emotional tales.", rating: 4.5, price: 310 },
  ];

  // Filter books by searchTerm
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm) ||
    book.author.toLowerCase().includes(searchTerm)
  );

  const [quantities, setQuantities] = useState({});
  const increaseQty = (title) => {
    setQuantities((prev) => ({ ...prev, [title]: (prev[title] || 0) + 1 }));
    setCartCount((count) => count + 1);
  };
  const decreaseQty = (title) => {
    setQuantities((prev) => {
      const current = prev[title] || 0;
      if (current > 0) setCartCount((count) => count - 1);
      return { ...prev, [title]: Math.max(0, current - 1) };
    });
  };

  return (
    <main className="carousel-section">
      <h1 className="carousel-title">
        {searchTerm ? `Search Results for "${searchTerm}"` : "Explore Our Book Collection"}
      </h1>

      <div className="carousel-wrapper">
        <div className="carousel-container" ref={carouselRef}>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <div className="carousel-card" key={index}>
                <img src={book.img} alt={book.title} className="carousel-img" />
                <div className="carousel-desc">
                  <h2>{book.title}</h2>
                  <h3>by {book.author}</h3>
                  <p className="price">Rs. {book.price}/-</p>

                  <div className="simple-qty-controls">
                    <button className="qty-btn" onClick={() => decreaseQty(book.title)}>−</button>
                    <span className="qty">{quantities[book.title] || 0}</span>
                    <button className="qty-btn" onClick={() => increaseQty(book.title)}>+</button>
                  </div>

                  <button
                    className="add-cart-btn"
                    onClick={() => alert(`${book.title} added to cart!`)}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No books found for "{searchTerm}"</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Home;
