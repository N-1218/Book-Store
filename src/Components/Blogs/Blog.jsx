import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Blog.css";

function Blog({ searchTerm = "" }) {

  const carouselRef1 = useRef(null);
  const carouselRef2 = useRef(null);

  /* ===== Book Data ===== */
  const books = [
    { img: assets.history, title: "History" },
    { img: assets.Mystery, title: "Mystery" },
    { img: assets.Fantasy, title: "Fantasy" },
    { img: assets.Romance, title: "Romance Novel" },
    { img: assets.Comic, title: "Comics" },
    { img: assets.Thriller, title: "Thriller" },
    { img: assets.Children, title: "Children Books" },
    { img: assets.Drama, title: "Drama" },
  ];

  const programmingBooks = [
    { img: assets.Java, title: "Java Programming" },
    { img: assets.React, title: "React for Beginners" },
    { img: assets.Springboot, title: "Spring Boot Guide" },
    { img: assets.JS, title: "JavaScript Mastery" },
    { img: assets.Comic, title: "Data Structures in Java" },
    { img: assets.history, title: "SQL for Beginners" },
    { img: assets.Mystery, title: "Data Analytics" },
    { img: assets.Drama, title: "Frameworks" },
  ];

  /* ===== Search Filter ===== */
  const filterBooks = (list) => {
    if (!searchTerm) return list;

    return list.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredBooks = filterBooks(books);
  const filteredProgrammingBooks = filterBooks(programmingBooks);

  /* ===== Slug Creator ===== */
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

    const interval1 = setInterval(() => autoScroll(carouselRef1), 3500);
    const interval2 = setInterval(() => autoScroll(carouselRef2), 3500);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };

  }, []);

  /* ===== Carousel Renderer ===== */
  const renderCarousel = (booksArray, ref) => (
    <>
      <div className="carousel-container" ref={ref}>
        {booksArray.map((book) => (
          <div className="carousel-card" key={book.title}>

            <div className="image-wrapper">
              <img src={book.img} alt={book.title} />
            </div>

            <h2>{book.title}</h2>

            <Link to={`/category/${createSlug(book.title)}`}>
              <button className="see-more-btn">See More</button>
            </Link>

          </div>
        ))}
      </div>

      {/* ⭐ View All Button */}
      <div className="view-all-wrapper">
        <Link to="/history">
          <button className="view-all-btn">View All</button>
        </Link>
      </div>
    </>
  );

  /* ===== UI ===== */
  return (
    <main className="carousel-section page-background">

      <h1 className="carousel-title">Old Books Collection</h1>

      {filteredBooks.length ? (
        renderCarousel(filteredBooks, carouselRef1)
      ) : (
        <p className="no-books">No books found</p>
      )}

      <h1 className="carousel-title" style={{ marginTop: "50px" }}>
        New Book Collection
      </h1>

      {filteredProgrammingBooks.length ? (
        renderCarousel(filteredProgrammingBooks, carouselRef2)
      ) : (
        <p className="no-books">No books found</p>
      )}

    </main>
  );
}

export default Blog;
