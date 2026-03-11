import React, { useEffect, useRef, useState } from "react";
import { FaTruck, FaStar, FaUsers, FaLightbulb, FaSyncAlt } from "react-icons/fa";
import "./About.css";

function About() {
  const featureRefs = useRef([]);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting && !visibleCards.includes(index)) {
            setVisibleCards((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.3 }
    );

    featureRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      featureRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [visibleCards]);

  const features = [
    { icon: <FaTruck />, text: "4–5 Days Express Delivery" },
    { icon: <FaStar />, text: "100% Authentic Products" },
    { icon: <FaUsers />, text: "1 Lakh + Happy Readers" },
    { icon: <FaLightbulb />, text: "Expertly Curated" },
    { icon: <FaSyncAlt />, text: "Easy Return & Prompt Support" },
  ];

  return (
    <main className="main page-background">
      <h1 className="carousel-title">Discover Our Journey</h1>
      <div className="features page-background">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={(el) => (featureRefs.current[index] = el)}
            data-index={index}
            className={`feature ${visibleCards.includes(index) ? "animate-in" : ""}`}
          >
            <div className="icon">{feature.icon}</div>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default About;