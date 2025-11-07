import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar.jsx';
import Loginpage from './Components/Loginpage.jsx';
import BlogDetails from './Components/Blogdetails.jsx';
import Home from './Components/Home.jsx';
import About from './Components/About.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/blogdetails" element={<BlogDetails />} />
    </Routes>
  </BrowserRouter>
);
