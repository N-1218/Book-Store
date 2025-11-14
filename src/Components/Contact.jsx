import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate
import Navbar from "./Navbar";
import Footer from "./Footer";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const navigate = useNavigate(); // <-- initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo, just alert
    alert(`Thank you, ${formData.name}! Your message has been sent.`);
    
    // Clear form
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Redirect to main page
    navigate("/"); // <-- redirect after submission
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-center text-primary mb-4">Contact Us</h2>
        <p className="text-center text-muted mb-5">
          We’d love to hear from you! Fill out the form below and we’ll get back to you shortly.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            background: "#f8f9fa",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
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

          <div className="mb-3">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="form-control"
              rows="5"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ fontWeight: "600" }}
          >
            Send Message
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
