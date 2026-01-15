import { Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar.jsx';
import Home from './Components/Home/Home.jsx';
import Blog from './Components/Blogs/Blog.jsx'
import Footer from './Components/Footer/Footer.jsx';
import RegistrationPage from './Components/Registration/Registrationpage.jsx';
import LoginPage from './Components/LoginPage/LoginPage.jsx';
import Contact from './Components/Contacts/Contact.jsx';
import About from './Components/About/About.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      {/* <Routes>
        <Route path="/" element={<Blogdetails />} />
        <Route path="/Blogdetails" element={<Home />} />
        <Route path="/About" element={<About/>}/>
        <Route path="/registrationpage" element={<RegistrationPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes> */}
      <Home/>
         <Blog/>
            <About/>
               <Contact/>


      <Footer />
    </>
  );
}
