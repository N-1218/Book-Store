
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerDashboard.css";

function CustomerDashBoard() {

  const userId = localStorage.getItem("userId");

  const [activeSection, setActiveSection] = useState("mybooks");
  const [showForm, setShowForm] = useState(false);

  const [myBooks, setMyBooks] = useState([]);
  const [orders, setOrders] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

  const [newBook, setNewBook] = useState({
    title: "",
    price: "",
    condition: ""
  });

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: ""
  });

  /* ================= FETCH MY BOOKS ================= */

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

  /* ================= FETCH ORDERS ================= */

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/orders/user/${userId}`
      );
      setOrders(response.data);
    } catch (error) {
      console.log("Order fetch error:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBooks();
      fetchOrders();
    }
  }, [userId]);

  /* ================= INPUT CHANGE ================= */

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

      fetchBooks();

    } catch (error) {
      console.log("Add Book Error:", error);
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

  /* ================= PROFILE ================= */

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async () => {

    try {
      await axios.put(
        `http://localhost:8080/user/update/${userId}`,
        profile
      );

      alert("Profile Updated Successfully");

    } catch (error) {
      console.log("Profile update error:", error);
    }

  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (

    <div className="dashboard-container">

      {/* ================= SIDEBAR ================= */}

      <div className="sidebar">

        <h2>Book Store</h2>

        <button onClick={() => setShowForm(!showForm)}>
          ➕ Sell Book
        </button>

        <button onClick={() => setActiveSection("mybooks")}>
          📚 My Books
        </button>

        <button onClick={() => setActiveSection("orders")}>
          📦 Orders
        </button>

        <button onClick={() => setActiveSection("profile")}>
          👤 Profile
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>

      {/* ================= MAIN CONTENT ================= */}

      <div className="main-content">

        {/* HEADER */}

        <div className="dashboard-header">
          <h1>Old Book Store Dashboard</h1>
        </div>

        {/* STATS */}

        <div className="dashboard-stats">

          <div className="stat-card">
            <h3>{myBooks.length}</h3>
            <p>My Books</p>
          </div>

          <div className="stat-card">
            <h3>{orders.length}</h3>
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

            <input type="file" onChange={handleFileChange} />

            <button onClick={handleAddBook}>
              Save Book
            </button>

          </div>

        )}

        {/* ================= MY BOOKS ================= */}

        {activeSection === "mybooks" && (

          <>
            <h2 className="section-title">My Books</h2>

            <div className="book-list">

              {myBooks.length === 0 ? (
                <p>No Books Added</p>
              ) : (

                myBooks.map((book) => (

                  <div key={book.bookId} className="book-card">

                    <img
src={`http://localhost:8080/uploads/${book.imageUrl}`}
alt={book.title}
className="book-image"
/>

                    <h3>{book.title}</h3>

                    <p>Price: ₹{book.price}</p>

                    <p>Condition: {book.condition}</p>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(book.bookId)}
                    >
                      Delete
                    </button>

                  </div>

                ))

              )}

            </div>
          </>

        )}

        {/* ================= ORDERS ================= */}

        {activeSection === "orders" && (

          <div className="orders-section">

            <h2>My Orders</h2>

            {orders.length === 0 ? (
              <p>No Orders Yet</p>
            ) : (

              orders.map((order) => (

                <div key={order.orderId} className="order-card">

                  <img
                    src={`http://localhost:8080/images/${order.imageUrl}`}
                    alt={order.title}
                    className="book-image"
                  />

                  <h3>{order.title}</h3>

                  <p>Price: ₹{order.price}</p>

                  <p>Status: {order.status}</p>

                </div>

              ))

            )}

          </div>

        )}

        {/* ================= PROFILE ================= */}

        {activeSection === "profile" && (

          <div className="profile-section">

            <h2>Edit Profile</h2>

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleProfileChange}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleProfileChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleProfileChange}
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              onChange={handleProfileChange}
            />

            <button onClick={handleUpdateProfile}>
              Update Profile
            </button>

          </div>

        )}

      </div>

    </div>

  );
}

export default CustomerDashBoard;

