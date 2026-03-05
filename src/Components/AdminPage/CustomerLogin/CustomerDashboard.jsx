import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CustomerDashboard.css";

function CustomerDashboard() {

  const navigate = useNavigate();

  /* ================= USER CHECK ================= */

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/");
    }
  }, [navigate]);

  /* ================= STATES ================= */

  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [myBooks, setMyBooks] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [newBook, setNewBook] = useState({
    title: "",
    price: "",
    condition: "",
  });

  /* ================= FETCH BOOKS ================= */

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      axios
        .get(`http://localhost:8080/book/user/${userId}`)
        .then((res) => setMyBooks(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  /* ================= HANDLE INPUT ================= */

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  /* ================= ADD BOOK ================= */

  const handleAddBook = () => {

    if (!newBook.title || !newBook.price || !newBook.condition || !selectedFile) {
      alert("Fill all fields");
      return;
    }

    const userId = localStorage.getItem("userId");

    const formData = new FormData();
    formData.append("title", newBook.title);
    formData.append("price", newBook.price);
    formData.append("condition", newBook.condition);
    formData.append("userId", userId);
    formData.append("file", selectedFile);

    axios
      .post("http://localhost:8080/book/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setMyBooks([...myBooks, res.data]);
        setShowForm(false);
        setNewBook({
          title: "",
          price: "",
          condition: "",
        });
        setSelectedFile(null);
      })
      .catch((err) => {
        alert("Error adding book");
        console.log(err);
      });
  };

  /* ================= DELETE BOOK ================= */

  const handleDeleteBook = (id) => {
    axios
      .delete(`http://localhost:8080/book/delete/${id}`)
      .then(() => {
        setMyBooks(myBooks.filter((book) => book.id !== id));
      })
      .catch((err) => console.log(err));
  };

  /* ================= DASHBOARD ================= */

  const renderDashboard = () => (
    <div className="stats-grid">
      <div className="card">
        <h2>{myBooks.length}</h2>
        <p>Books Selling</p>
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

          {/* CHOOSE FILE OPTION */}
          <input
            type="file"
            onChange={handleFileChange}
          />

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
              src={`http://localhost:8080/uploads/${book.imageUrl}`}
              alt=""
              width="60"
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

  /* ================= SWITCH ================= */

  const renderContent = () => {
    if (activeMenu === "books") return renderBooks();
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
        </ul>
      </aside>

      <div className="main">

        <header className="header">
          <h2>Customer Dashboard</h2>
          <button
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              navigate("/");
            }}
          >
            Logout
          </button>
        </header>

        <div className="content">
          {renderContent()}
        </div>

      </div>

    </div>
  );
}

export default CustomerDashboard;