import React from "react";
<<<<<<< HEAD
import { FaTruck, FaStar, FaUsers, FaLightbulb, FaSyncAlt } from "react-icons/fa";
import Navbar from "./Navbar";
import { assets } from "../assets/assets";

function About() {
  return (
    <main className="main">
        <h1 className="carousel-title">Discover Our Journey</h1>
    <div className="features">
      <div className="feature">
        <FaTruck className="icon" />
        <p>4–5 Days Express Delivery</p>
      </div>
      <div className="feature">
        <FaStar className="icon" />
        <p>100% Authentic Products</p>
      </div>
      <div className="feature">
        <FaUsers className="icon" />
        <p>1 Lakh + Happy Readers</p>
      </div>
      <div className="feature">
        <FaLightbulb className="icon" />
        <p>Expertly Curated</p>
      </div>
      <div className="feature">
        <FaSyncAlt className="icon" />
        <p>Easy Return & Prompt Support</p>
      </div>
    </div>
    </main>
  );
}

export default About;
=======
//import AboutImg from "../assets/about-img.png";

const About = () => {
  return (
    <section className="bg-secondery text-white px-5 py-32" id="about">
      <div className="container mx-auto grid md:grid-cols-2 items-center justify-center md:justify-between">
        <div className="about-info">
          <h2 className="text-4xl font-bold mb-5 border-b-[5px] w-[180px] border-indigo-600 pb-2">
            About Me
          </h2>

          <p className="pb-5">
            Hi, My Name Is Rohima Akther everyone calls me Amrin. I am a
            Frontend Developer. I build beautifull websites with React and
            Tailwind CSS.
          </p>
          <p className="pb-5">
            I am proficient in Frontend skills like React.js, Redux, Redux Tool
            Kit, Axios, Tailwind CSS, SaSS, Css3 and many more.
          </p>

          <p>In backend I know Node.js, Express.js, MongoDB, and Mongoose</p>

          <p>
            In my spare time I create YouTube videos and write blogs on my Blog.
            Where I talk about programming theory and build various projects.
          </p>
        </div>

        <div className="about-img">
          <img
            src={AboutImg}
            alt="coding illustration"
            className="lgw-[80%] md:ml-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
>>>>>>> 69952499ab6155c0a3bd356a14ed86b3feb3b924
