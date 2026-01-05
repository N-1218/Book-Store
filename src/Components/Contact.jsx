<<<<<<< HEAD
import React, { useState } from "react";
import { FaTruck, FaStar, FaUsers, FaLightbulb, FaSyncAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";



function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Thank you, ${formData.name}! Your message has been sent.`);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    // ✅ Redirect to HOME route
    navigate("/");
  };

  return (
    <>
    <Navbar/>
      <div className="container my-5">
        <h2 className="text-center text-primary mb-3">Contact Us</h2>

        <p className="text-center text-muted mb-5">
          We’d love to hear from you! Fill out the form below and we’ll get back
          to you shortly.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto"
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

          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            style={{ fontWeight: "600" }}
          >
            Send Message
          </button>
        </form>
      </div>

      <Footer/>
    </>
  );
}

export default Contact;
=======
import React from "react";

const Contact = () => {
  return (
    <section className="bg-secondery px-5 py-32" id="contact">
      <div className="text-center md:w-[60%] mx-auto text-white">
        <h2 className="text-4xl font-bold mb-5 border-b-[5px] w-[200px] mx-auto border-indigo-600 pb-2">
          Contact Me
        </h2>
        <p>
          I am currently open for a fulltime Frontend Developer role. If you
          want to discuss about that feel free to email me or call me.
        </p>

        <p className="py-2">
          <span className="font-bold">Email:</span> coderamrin@gmail.com
        </p>
        <p className="py-2">
          <span className="font-bold">Phone:</span> +88 01624-890723
        </p>
      </div>
    </section>
  );
};

export default Contact;
>>>>>>> 69952499ab6155c0a3bd356a14ed86b3feb3b924
