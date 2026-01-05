<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar.jsx';
import Home from './Components/Home.jsx';
import Blogdetails from './Components/Blogdetails.jsx';
import Footer from './Components/Footer.jsx';
import RegistrationPage from './Components/Registrationpage.jsx';
import LoginPage from './Components/LoginPage.jsx';
import Contact from './Components/Contact.jsx';
import About from './Components/About.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/Blogdetails" element={<Blogdetails />} />
        <Route path="/About" element={<About/>}/>
        <Route path="/registrationpage" element={<RegistrationPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

=======
import "./App.css";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Project from "./Components/Project";
import Blog from "./Components/Blog";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Project />
      <Blog />
      <Contact />
>>>>>>> 69952499ab6155c0a3bd356a14ed86b3feb3b924
      <Footer />
    </>
  );
}
<<<<<<< HEAD
=======

export default App;
>>>>>>> 69952499ab6155c0a3bd356a14ed86b3feb3b924
