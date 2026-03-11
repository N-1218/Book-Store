import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const navigate = useNavigate();

  // Ref and state for entrance animation
  const formRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle visibility when entering or leaving viewport
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (formRef.current) observer.observe(formRef.current);

    return () => {
      if (formRef.current) observer.unobserve(formRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been sent.`);
    setFormData({ name: "", email: "", subject: "", message: "" });
    navigate("/");
  };

  return (
    <div className="container my-5 page-background">
      <h2 className="text-center text-primary mb-3">Contact Us</h2>
      <p className="text-center text-muted mb-5">
        We’d love to hear from you! Fill out the form below and we’ll get back to you shortly.
      </p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`mx-auto ${visible ? "animate-in" : ""}`}
        style={{
          maxWidth: "600px",
          background: "#f8f9fa",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-4">
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="form-control"
            rows="5"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 py-2" style={{ fontWeight: "600" }}>
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;