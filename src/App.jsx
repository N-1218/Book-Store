import React from "react";
import Navbar from "./Components/Navbar";
import BlogDetails from "./Components/Blogdetails";
import Home from "./Components/Home";
import About from "./Components/About";
import RegistrationPage from "./Components/Registrationpage";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <BlogDetails/>
      <Home />
      <About>
        <Navbar/>
      </About>
      
      <Footer/>

      
    </>
  );
}

export default App;
