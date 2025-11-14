import React, { useState } from "react";
import 'src/index.css';
import 'src/main.jsx';
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import BlogDetails from "./Components/Blogdetails";
import About from "./Components/About";
import RegistrationPage from "./Components/Registrationpage";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";

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
