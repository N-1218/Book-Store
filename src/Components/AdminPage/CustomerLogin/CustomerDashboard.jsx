import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CustomerDashboard.css";

function CustomerDashboard() {

  const navigate = useNavigate();

  /* ================= USER ================= */

  const user = JSON.parse(localStorage.getItem("user"));

  /* ================= STATE ================= */

  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [myBooks, setMyBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [newBook, setNewBook] = useState({
    title: "",
    price: "",
    condition: "",
    imagePath: ""
  });

  const sliderRef = useRef(null);

  const API = "http://localhost:8080/api/books";

  /* ================= LOAD DATA ================= */

  useEffect(() => {

    if (!user) {
      navigate("/");
      return;
    }

    loadBooks();

    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);

  }, []);

  /* ================= LOAD BOOKS ================= */

  const loadBooks = async () => {
    try {
      const res = await axios.get(`${API}/user/${user.id}`);
      setMyBooks(res.data);
    } catch (err) {
      console.error("Load Books Error", err);
    }
  };

  /* ================= ADD BOOK ================= */

  const handleAddBook = async () => {

    if (!newBook.title || !newBook.price || !newBook.condition) {
      alert("Fill all fields");
      return;
    }

    try {

     await axios.post(`${API}/add/${user.id}`, {
  title: newBook.title,
  price: parseFloat(newBook.price),
  condition: newBook.condition,
  imagePath: newBook.imagePath
});

      setShowForm(false);
      loadBooks();

    } catch (error) {
      console.error(error);
      alert("Error adding book");
    }
  };

  /* ================= DELETE BOOK ================= */

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      loadBooks();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= INPUT ================= */

  const handleInputChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value
    });
  };

  /* ================= IMAGE BASE64 ================= */

  const handleImageChange = (e) => {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () =>
      setNewBook({
        ...newBook,
        imagePath: reader.result
      });

    reader.readAsDataURL(file);
  };

  /* ================= WISHLIST ================= */

  const removeWishlist = (id) => {
    const updated = wishlist.filter((b) => b.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  /* ================= SLIDER ================= */

  const slideLeft = () =>
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });

  const slideRight = () =>
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  /* ================= DASHBOARD CONTENT ================= */

  const renderContent = () => {

    /* ---------- MY BOOKS ---------- */

    if (activeMenu === "books") {
      return (
        <div className="table">

          <h3>My Books</h3>

          <button
            className="btn-add-book"
            onClick={() => setShowForm(!showForm)}
          >
            + Add Book
          </button>

          {showForm && (
            <div className="add-book-form">

              <input
                name="title"
                placeholder="Title"
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
                <option>Like New</option>
                <option>Good</option>
                <option>Old</option>
              </select>

              <input type="file" onChange={handleImageChange} />

              <button className="btn" onClick={handleAddBook}>
                Add Book
              </button>

            </div>
          )}

          {myBooks.length === 0 ? (
            <p>No Books Added</p>
          ) : (
            myBooks.map((book) => (
              <div key={book.id} className="row">

                <img
                  src={book.imagePath || "https://via.placeholder.com/50"}
                  className="book-thumb"
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
    }

    /* ---------- WISHLIST ---------- */

    if (activeMenu === "wishlist") {
      return (
        <div className="wishlist-section">

          <h3>Wishlist</h3>

          <button onClick={slideLeft}>◀</button>

          <div className="wishlist-slider" ref={sliderRef}>
            {wishlist.map((book) => (
              <div key={book.id} className="wishlist-card">
                <img src={book.img} alt="" />
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
    }

    /* ---------- DASHBOARD ---------- */

    return (
      <div className="stats-grid">

        <div className="card">
          <h2>{myBooks.length}</h2>
          <p>Books Selling</p>
        </div>

        <div className="card">
          <h2>{wishlist.length}</h2>
          <p>Wishlist</p>
        </div>

      </div>
    );
  };

  /* ================= UI ================= */

  return (
    <div className="dashboard">

      <aside className="sidebar">
        <div className="logo">OldBook Store</div>

        <ul className="menu">
          <li onClick={() => setActiveMenu("dashboard")}>Dashboard</li>
          <li onClick={() => setActiveMenu("books")}>My Books</li>
          <li onClick={() => setActiveMenu("wishlist")}>Wishlist</li>
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