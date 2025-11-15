import React, { useState } from "react";
import './index.css';
import './main.jsx';
import Navbar from "./Components/Navbar.jsx";
import Home from "./Components/Home.jsx";
import BlogDetails from "./Components/Blogdetails.jsx";
import About from "./Components/About.jsx";
import RegistrationPage from "./Components/Registrationpage.jsx";
import Footer from "./Components/Footer.jsx";
import Contact from "./Components/Contact.jsx";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar cartCount={cartCount} setSearchTerm={setSearchTerm} />
      <BlogDetails />
      <Home setCartCount={setCartCount} searchTerm={searchTerm} />
      <About />
      <Footer />
    </>
  );
}

export default App;
