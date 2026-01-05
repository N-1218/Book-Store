import React, { useRef, useState } from "react";
import { assets } from "../assets/assets";

function Blogdetails({ setCartCount = () => {}, searchTerm = "" }) {
  const carouselRef = useRef(null);
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

  const term = searchTerm.toLowerCase();
  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(term) ||
      b.author.toLowerCase().includes(term)
  );

  const increaseQty = (title) => {
    setQuantities((p) => ({ ...p, [title]: (p[title] || 0) + 1 }));
    setCartCount((c) => c + 1);
  };

  const decreaseQty = (title) => {
    setQuantities((p) => {
      const val = p[title] || 0;
      if (val > 0) setCartCount((c) => Math.max(0, c - 1));
      return { ...p, [title]: Math.max(0, val - 1) };
    });
  };

  return (
    <main className="carousel-section">
      <h1 className="carousel-title">Explore Our Book Collection</h1>

      <div className="carousel-container" ref={carouselRef}>
        {filteredBooks.length ? (
          filteredBooks.map((book) => (
            <div className="carousel-card" key={book.title}>
              <img src={book.img} alt={book.title} />
              <h2>{book.title}</h2>
              <p>by {book.author}</p>
              <p>₹ {book.price}</p>

              <div>
                <button onClick={() => decreaseQty(book.title)}>-</button>
                <span>{quantities[book.title] || 0}</span>
                <button onClick={() => increaseQty(book.title)}>+</button>
              </div>
            </div>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </main>
  );
}

export default Blogdetails;
