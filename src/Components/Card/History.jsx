import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./History.css";

function History({ searchTerm = "", setCartCount }) {
  const [quantities, setQuantities] = useState({});

  const books = [
    { img: assets.history, title: "History", price: 350 },
    { img: assets.Mystery, title: "Mystery", price: 420 },
    { img: assets.Fantasy, title: "Fantasy", price: 280 },
    { img: assets.Romance, title: "Romance Novel", price: 500 },
    { img: assets.Comic, title: "Comics", price: 300 },
    { img: assets.Thriller, title: "Thriller", price: 450 },
    { img: assets.Children, title: "Children's Books", price: 250 },
    { img: assets.Drama, title: "Drama", price: 320 },
  ];

  const increaseQty = (title) => {
    setQuantities((prev) => ({
      ...prev,
      [title]: (prev[title] || 0) + 1,
    }));
    setCartCount((count) => count + 1);
  };

  const decreaseQty = (title) => {
    setQuantities((prev) => {
      const current = prev[title] || 0;
      if (current > 0) {
        setCartCount((count) => Math.max(0, count - 1));
      }
      return {
        ...prev,
        [title]: Math.max(0, current - 1),
      };
    });
  };

  return (
    <main className="history-page">
      <h1 className="history-title"> History Books Collection</h1>

      <div className="history-grid">
        {books.map((book) => {
          const qty = quantities[book.title] || 0;

          return (
            <div className="history-card" key={book.title}>
              <img src={book.img} alt={book.title} />
              <h2>{book.title}</h2>
              <p className="price">₹ {book.price}</p>

              {/* Add / Remove Buttons */}
              <div className="qty-controls">
                <button onClick={() => decreaseQty(book.title)}>-</button>
                <span>{qty}</span>
                <button onClick={() => increaseQty(book.title)}>+</button>
              </div>

              <p className="total">
                Total: <strong>₹ {book.price * qty}</strong>
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default History;
