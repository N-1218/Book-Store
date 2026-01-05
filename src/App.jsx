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

      <Footer />
    </>
  );
}
