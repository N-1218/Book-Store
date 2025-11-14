import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App.jsx';
import Navbar from './Components/Navbar.jsx';
import Home from './Components/Home.jsx';
import BlogDetails from './Components/Blogdetails.jsx';
import Footer from './Components/Footer.jsx';
import RegistrationPage from './Components/Registrationpage.jsx';
import LoginPage from './Components/Loginpage.jsx';
import Contact from './Components/Contact.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/blogdetails" element={<BlogDetails />} />
      <Route path="/home" element={<Home />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/registrationpage" element={<RegistrationPage />} />
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </BrowserRouter>
);
