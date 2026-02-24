import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Blog.css";

function Blog({ searchTerm = "" }) {

  const carouselRef1 = useRef(null);
  const carouselRef2 = useRef(null);

  /* ===== Book Data ===== */
  const books = [
    { id: 1, img: assets.history, title: "History" },
    { id: 2, img: assets.Mystery, title: "Mystery" },
    { id: 3, img: assets.Fantasy, title: "Fantasy" },
    { id: 4, img: assets.Romance, title: "Romance Novel" },
    { id: 5, img: assets.Comic, title: "Comics" },
    { id: 6, img: assets.Thriller, title: "Thriller" },
    { id: 7, img: assets.Children, title: "Children Books" },
    { id: 8, img: assets.Drama, title: "Drama" },
  ];

  const programmingBooks = [
    { id: 9, img: assets.Java, title: "Java Programming" },
    { id: 10, img: assets.React, title: "React for Beginners" },
    { id: 11, img: assets.Springboot, title: "Spring Boot Guide" },
    { id: 12, img: assets.JS, title: "JavaScript Mastery" },
    { id: 13, img: assets.Comic, title: "Data Structures in Java" },
    { id: 14, img: assets.history, title: "SQL for Beginners" },
    { id: 15, img: assets.Mystery, title: "Data Analytics" },
    { id: 16, img: assets.Drama, title: "Frameworks" },
  ];

  /* ================= WISHLIST FUNCTION ================= */

  const addToWishlist = (book) => {

    let wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find((b) => b.id === book.id);

    if (!exists) {
      wishlist.push(book);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("❤️ Added to Wishlist");
    } else {
      alert("Already in Wishlist");
    }
  };

  /* ===== Search Filter ===== */
  const filterBooks = (list) => {
    if (!searchTerm) return list;

    return list.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredBooks = filterBooks(books);
  const filteredProgrammingBooks = filterBooks(programmingBooks);

  /* ===== Slug ===== */
  const createSlug = (title) =>
    title.toLowerCase().replace(/\s+/g, "-");

  /* ===== Auto Scroll ===== */
  useEffect(() => {

    const autoScroll = (ref) => {
      if (!ref.current) return;

      const container = ref.current;

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 180, behavior: "smooth" });
      }
    };

    const i1 = setInterval(() => autoScroll(carouselRef1), 3500);
    const i2 = setInterval(() => autoScroll(carouselRef2), 3500);

    return () => {
      clearInterval(i1);
      clearInterval(i2);
    };

  }, []);

  /* ===== Carousel Renderer ===== */

  const renderCarousel = (booksArray, ref) => (
    <>
      <div className="carousel-container" ref={ref}>
        {booksArray.map((book) => (

          <div className="carousel-card" key={book.id}>

            <div className="image-wrapper">
              <img src={book.img} alt={book.title} />
            </div>

            <h2>{book.title}</h2>

            <div className="card-buttons">

              <Link to={`/category/${createSlug(book.title)}`}>
                <button className="see-more-btn">
                  See More
                </button>
              </Link>

              <button
                className="wishlist-btn"
                onClick={() => addToWishlist(book)}
              >
                ❤️
              </button>

            </div>

          </div>

        ))}
      </div>

      <div className="view-all-wrapper">
        <Link to="/history">
          <button className="view-all-btn">View All</button>
        </Link>
      </div>
    </>
  );

  return (
    <main className="carousel-section page-background">

      <h1 className="carousel-title">Old Books Collection</h1>

      {filteredBooks.length
        ? renderCarousel(filteredBooks, carouselRef1)
        : <p className="no-books">No books found</p>}

      <h1 className="carousel-title" style={{ marginTop: "50px" }}>
        New Book Collection
      </h1>

      {filteredProgrammingBooks.length
        ? renderCarousel(filteredProgrammingBooks, carouselRef2)
        : <p className="no-books">No books found</p>}

    </main>
  );
}

export default Blog;