import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerDashBoard.css";

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

  /* ================= FETCH USER BOOKS ================= */

  useEffect(() => {
    if(userId){
      fetchBooks();
    }
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/book/user/${userId}`
      );
      setMyBooks(response.data);
    } catch (error) {
      console.log("Error fetching books", error);
    }
  };

  /* ================= INPUT CHANGE ================= */

  const handleChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value
    });
  };

  /* ================= FILE CHANGE ================= */

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
        formData
      );

      setMyBooks([...myBooks, response.data]);

      setNewBook({
        title: "",
        price: "",
        condition: ""
      });

      setSelectedFile(null);
      setShowForm(false);

    } catch (error) {
      console.log(error);
      alert("Error adding book");
    }
  };

  /* ================= DELETE BOOK ================= */

  const handleDelete = async (bookId) => {

    try {

      await axios.delete(`http://localhost:8080/book/delete/${bookId}`);

      setMyBooks(myBooks.filter((book) => book.bookId !== bookId));

    } catch (error) {
      console.log("Delete error", error);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="dashboard-container">

      <h1>Customer Dashboard</h1>

      <button
        className="add-btn"
        onClick={() => setShowForm(!showForm)}
      >
        Add Book
      </button>

      {showForm && (
        <div className="form-container">

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

          <input
            type="text"
            name="condition"
            placeholder="Condition"
            value={newBook.condition}
            onChange={handleChange}
          />

          <input
            type="file"
            onChange={handleFileChange}
          />

          <button onClick={handleAddBook}>
            Save Book
          </button>

        </div>
      )}

      <div className="book-list">

        {myBooks.length === 0 ? (
          <p>No Books Added</p>
        ) : (

          myBooks.map((book) => (

            <div key={book.bookId} className="book-card">

              <img
                src={`http://localhost:8080/images/${book.image}`}
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