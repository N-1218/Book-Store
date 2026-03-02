import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";

function CustomerDashboard() {

  const navigate = useNavigate();
  const sliderRef = useRef(null);

  /* ================= USER CHECK ================= */

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      navigate("/");
    }
  }, [navigate]);

  /* ================= STATE ================= */

  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);

  const [myBooks, setMyBooks] = useState(
    JSON.parse(localStorage.getItem("myBooks")) || []
  );

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  /* ✅ NEW ORDERS STATE */
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );

  const [newBook, setNewBook] = useState({
    title: "",
    price: "",
    condition: "",
    imagePath: "",
  });

  /* ================= FORM ================= */

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () =>
      setNewBook({ ...newBook, imagePath: reader.result });

    reader.readAsDataURL(file);
  };

  const handleAddBook = () => {

    if (!newBook.title || !newBook.price || !newBook.condition) {
      alert("Fill all fields");
      return;
    }

    const updatedBooks = [
      ...myBooks,
      { id: Date.now(), ...newBook },
    ];

    setMyBooks(updatedBooks);
    localStorage.setItem("myBooks", JSON.stringify(updatedBooks));

    setNewBook({
      title: "",
      price: "",
      condition: "",
      imagePath: "",
    });

    setShowForm(false);
  };

  const handleDeleteBook = (id) => {
    const updated = myBooks.filter((b) => b.id !== id);
    setMyBooks(updated);
    localStorage.setItem("myBooks", JSON.stringify(updated));
  };

  /* ================= WISHLIST ================= */

  const removeWishlist = (id) => {
    const updated = wishlist.filter((b) => b.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  /* ================= ORDERS ================= */

  const deleteOrder = (id) => {
    const updated = orders.filter((o) => o.id !== id);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  /* ================= SLIDER ================= */

  const slideLeft = () =>
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });

  const slideRight = () =>
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  /* ================= DASHBOARD ================= */

  const renderDashboard = () => (
    <div className="stats-grid">

      <div className="card">
        <h2>{myBooks.length}</h2>
        <p>Books Selling</p>
      </div>

      <div className="card">
        <h2>{wishlist.length}</h2>
        <p>Wishlist</p>
      </div>

      <div className="card">
        <h2>{orders.length}</h2>
        <p>Total Orders</p>
      </div>

    </div>
  );

  /* ================= BOOKS ================= */

  const renderBooks = () => (
    <div className="table">

      <h3>My Books</h3>

      <button
        className="primary-btn"
        onClick={() => setShowForm(!showForm)}
      >
        + Add Book
      </button>

      {showForm && (
        <div className="add-book-form">

          <input
            name="title"
            placeholder="Book Title"
            value={newBook.title}
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newBook.price}
            onChange={handleInputChange}
          />

          <select
            name="condition"
            value={newBook.condition}
            onChange={handleInputChange}
          >
            <option value="">Condition</option>
            <option>New</option>
            <option>Good</option>
            <option>Old</option>
          </select>

          <input type="file" onChange={handleImageChange} />

          <button className="primary-btn" onClick={handleAddBook}>
            Save
          </button>

        </div>
      )}

      {myBooks.length === 0 ? (
        <p>No Books Added</p>
      ) : (
        myBooks.map((book) => (
          <div key={book.id} className="row">

            <img
              src={book.imagePath || "https://via.placeholder.com/60"}
              alt=""
            />

            <span>{book.title}</span>
            <span>₹{book.price}</span>

            <button
              className="delete-btn"
              onClick={() => handleDeleteBook(book.id)}
            >
              Delete
            </button>

          </div>
        ))
      )}
    </div>
  );

  /* ================= WISHLIST ================= */

  const renderWishlist = () => (
    <div className="wishlist-section">

      <h3>Wishlist</h3>

      <button onClick={slideLeft}>◀</button>

      <div className="wishlist-slider" ref={sliderRef}>
        {wishlist.map((book) => (
          <div key={book.id} className="wishlist-card">
            <img src={book.imagePath} alt="" />
            <h4>{book.title}</h4>
            <button onClick={() => removeWishlist(book.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <button onClick={slideRight}>▶</button>

    </div>
  );

  /* ================= ORDERS PAGE ================= */

  const renderOrders = () => (
    <div className="table">

      <h3>My Orders</h3>

      {orders.length === 0 ? (
        <p>No Orders Yet</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="row">

            <img src={order.imagePath} alt="" />

            <span>{order.title}</span>
            <span>₹{order.price}</span>
            <span>Status: Delivered</span>

            <button
              className="delete-btn"
              onClick={() => deleteOrder(order.id)}
            >
              Remove
            </button>

          </div>
        ))
      )}

    </div>
  );

  /* ================= SWITCH CONTENT ================= */

  const renderContent = () => {
    if (activeMenu === "books") return renderBooks();
    if (activeMenu === "wishlist") return renderWishlist();
    if (activeMenu === "orders") return renderOrders();
    return renderDashboard();
  };

  /* ================= UI ================= */

  return (
    <div className="dashboard">

      <aside className="sidebar">
        <h2>OldBook Store</h2>

        <ul>
          <li onClick={() => setActiveMenu("dashboard")}>Dashboard</li>
          <li onClick={() => setActiveMenu("books")}>My Books</li>
          <li onClick={() => setActiveMenu("wishlist")}>Wishlist</li>

          {/* ✅ NEW ORDER MENU */}
          <li onClick={() => setActiveMenu("orders")}>Orders</li>

        </ul>
      </aside>

      <div className="main">

        <header className="header">
          <h2>Customer Dashboard</h2>
          <button onClick={handleLogout}>Logout</button>
        </header>

        <div className="content">
          {renderContent()}
        </div>

      </div>

    </div>
  );
}

export default CustomerDashboard;