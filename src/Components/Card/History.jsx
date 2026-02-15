import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./History.css";
  import { FaPhone } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";


function History({ searchTerm = "", setCartCount }) {
  const [quantities, setQuantities] = useState({});

  /* ⭐ Seller Details */
  const sellerPhone = "919876543210"; // replace with seller number
  const whatsappMessage = "Hello, I want to inquire about this book.";

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

  /* ================= Quantity ================= */

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

  /* ================= Contact Seller ================= */

  const callSeller = () => {
    window.location.href = `tel:${sellerPhone}`;
  };

  const messageSeller = (bookTitle) => {
    const message = encodeURIComponent(
      `${whatsappMessage} Book: ${bookTitle}`
    );

    window.open(
      `https://wa.me/${sellerPhone}?text=${message}`,
      "_blank"
    );
  };

  return (
    <main className="history-page">
      <h1 className="history-title">History Books Collection</h1>

      <div className="history-grid">
        {books.map((book) => {
          const qty = quantities[book.title] || 0;

          return (
            <div className="history-card" key={book.title}>
              <img src={book.img} alt={book.title} />

              <h2>{book.title}</h2>

              <p className="price">₹ {book.price}</p>

              {/* Quantity Controls */}
              <div className="qty-controls">
                <button onClick={() => decreaseQty(book.title)}>-</button>
                <span>{qty}</span>
                <button onClick={() => increaseQty(book.title)}>+</button>
              </div>

              <p className="total">
                Total: <strong>₹ {book.price * qty}</strong>
              </p>

              {/* ⭐ Contact Seller Buttons */}
          
<div className="contact-buttons">

  <button className="call-btn">
    <FaPhone style={{ marginRight: "6px" }} />
  
  </button>

  <button className="whatsapp-btn">
    <FaWhatsapp style={{ marginRight: "6px" }} />
    
  </button>

</div>

            </div>
          );
        })}
      </div>
    </main>
  );
}

export default History;
