import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerDashboard.css";

function CustomerDashBoard() {

  const [myBooks, setMyBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [newBook, setNewBook] = useState({
    title: "",
    price: "",
    condition: ""
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchBooks();
    }
  }, [userId]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/book/user/${userId}`
      );
      setMyBooks(response.data);
    } catch (error) {
      console.log("Error fetching books:", error);
    }
  };

  const handleChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  /* ================= ADD BOOK ================= */

  const handleAddBook = async () => {

    if (!newBook.title || !newBook.price || !newBook.condition || !selectedFile) {
      alert("Please fill all fields");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("title", newBook.title);
      formData.append("price", newBook.price);
      formData.append("condition", newBook.condition);
      formData.append("image", selectedFile);
      formData.append("userId", userId);

      const response = await axios.post(
        "http://localhost:8080/book/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setMyBooks([...myBooks, response.data]);

      setNewBook({
        title: "",
        price: "",
        condition: ""
      });

      setSelectedFile(null);

      setShowForm(false);

      fetchBooks(); // refresh list

    } catch (error) {
      console.log("Add Book Error:", error.response?.data || error.message);
      alert("Error adding book");
    }
  };

  /* ================= DELETE BOOK ================= */

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8080/book/delete/${bookId}`);
      setMyBooks(myBooks.filter((book) => book.bookId !== bookId));
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (

    <div className="dashboard-container">

      {/* HEADER */}

      <div className="dashboard-header">
        <h1>Old Book Store Dashboard</h1>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>


      {/* ACTION BUTTONS */}

      <div className="dashboard-actions">

        <button onClick={() => setShowForm(!showForm)}>
          ➕ Sell Book
        </button>

        <button>📚 My Books</button>

        <button>🛒 Browse Books</button>

        <button>📦 Orders</button>

        <button>👤 Profile</button>

      </div>


      {/* STATS */}

      <div className="dashboard-stats">

        <div className="stat-card">
          <h3>{myBooks.length}</h3>
          <p>My Books</p>
        </div>

        <div className="stat-card">
          <h3>₹0</h3>
          <p>Total Earnings</p>
        </div>

        <div className="stat-card">
          <h3>0</h3>
          <p>Orders</p>
        </div>

      </div>


      {/* ADD BOOK FORM */}

      {showForm && (

        <div className="form-container">

          <h3>Add New Book</h3>

          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={newBook.title}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newBook.price}
            onChange={handleChange}
          />

          <select
            name="condition"
            value={newBook.condition}
            onChange={handleChange}
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
          </select>

          <input
            type="file"
            onChange={handleFileChange}
          />

          <button onClick={handleAddBook}>
            Save Book
          </button>

        </div>

      )}


      {/* BOOK LIST */}

      <h2 className="section-title">My Books</h2>

      <div className="book-list">

        {myBooks.length === 0 ? (
          <p>No Books Added</p>
        ) : (

          myBooks.map((book) => (

            <div key={book.bookId} className="book-card">

              <img
                src={`http://localhost:8080/images/${book.imageUrl}`}
                alt={book.title}
                className="book-image"
              />

              <h3>{book.title}</h3>

              <p>Price: ₹{book.price}</p>

              <p>Condition: {book.condition}</p>

              <div className="btn-group">

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(book.bookId)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );
}

export default CustomerDashBoard;