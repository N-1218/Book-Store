import React, { useRef } from "react";
import { assets } from "../assets/assets.js";


function Home() {
  const carouselRef = useRef(null);

  const books = [
    {
      img: assets.history,
      title: "History",
      author: "Jojo Moyes",
      desc: "If you want another book then click the below button..!",
      rating: 4.5,
      price: "Rs.340/-",
    },
    {
      img: assets.Mystery,
      title: "Mystery",
      author: "Elizabeth Gilbert",
      desc: "Readers of all ages and walks of life have drawn inspiration from Elizabeth Gilbert’s books.",
      rating: 4.8,
      price: "Rs.450/-",
    },
    {
      img: assets.Fantasy,
      title: "Fantasy",
      author: "Ruth Ozeki",
      desc: "In Tokyo, sixteen-year-old Nao has decided there’s only one escape from her aching loneliness.",
      rating: 4.3,
      price: "Rs.175/-",
    },
    {
      img: assets.Romance,
      title: "Romance Novel",
      author: "F. Scott Fitzgerald",
      desc: "The novel was inspired by a youthful romance Fitzgerald had with socialite Ginevra King.",
      rating: 4.9,
      price: "Rs.665/-",
    },
    {
      img: assets.Mystery,
      title: "Comics",
      author: "Stan Lee",
      desc: "Comics is a medium used to express ideas with images, often combined with text or other visual information.",
      rating: 4.6,
      price: "Rs.520/-",
    },
    {
      img: assets.Mystery,
      title: "Thriller",
      author: "James Patterson",
      desc: "Thriller is a genre of fiction with numerous, often overlapping, subgenres, including crime, horror, and detective fiction.",
      rating: 4.4,
      price: "Rs.375/-",
    },
    {
      img: assets.Mystery,
      title: "Children's Books",
      author: "J.K. Rowling",
      desc: "Children's books are massively popular in both print and ebook versions.",
      rating: 4.7,
      price: "Rs.299/-",
    },
    {
      img: assets.Mystery,
      title: "Drama",
      author: "Elizabeth Gilbert",
      desc: "Drama is the specific mode of fiction represented in performance: a play, opera, mime, ballet, etc.",
      rating: 4.5,
      price: "Rs.310/-",
    },
  ];

  // Scroll handler
  const scroll = (direction) => {
    const container = carouselRef.current;
    const scrollAmount = 320;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <main className="carousel-section">
      <h1 className="carousel-title">Explore Our Book Collection</h1>

      <div className="carousel-wrapper">
        <button className="arrow-btn left" onClick={() => scroll("left")}>
          &#10094;
        </button>

        <div className="carousel-container" ref={carouselRef}>
          {books.map((book, index) => (
            <div className="carousel-card" key={index}>
              <img src={book.img} alt={book.title} className="carousel-img" />
              <div className="carousel-desc">
                <h2 className="book-name">{book.title}</h2>
                <h3 className="author">by {book.author}</h3>

                {/* Rating */}
                <div className="rating">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={
                        i < Math.floor(book.rating)
                          ? "star filled"
                          : i < book.rating
                          ? "star half"
                          : "star"
                      }
                    >
                      ★
                    </span>
                  ))}
                  <span className="rating-value">
                    {book.rating?.toFixed(1) || "4.0"}
                  </span>
                </div>

                <p className="price">{book.price}</p>
                <p className="info">{book.desc}</p>
                <button type="button">See the Book</button>
              </div>
            </div>
          ))}
        </div>

        <button className="arrow-btn right" onClick={() => scroll("right")}>
          &#10095;
        </button>
      </div>
    </main>
  );
}

export default Home;
