import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar.jsx';
import RegistrationPage from './Components/Registrationpage.jsx';
import BlogDetails from './Components/Blogdetails.jsx';
import Home from './Components/Home.jsx';
import About from './Components/About.jsx';
import Footer from './Components/Footer.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path='/Navbar'element={<Navbar />}/>
      <Route path="/home" element={<Home />} />
      <Route path="/blogdetails" element={<BlogDetails />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/registrationpage" element={<RegistrationPage />} />
    </Routes>
  </BrowserRouter>
);
