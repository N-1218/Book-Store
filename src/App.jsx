import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Blog from "./Components/Blogs/Blog";
import Footer from "./Components/Footer/Footer";
import RegistrationPage from "./Components/Registration/Registrationpage";
import LoginPage from "./Components/LoginPage/LoginPage";
import Contact from "./Components/Contacts/Contact";
import About from "./Components/About/About";
import History from "./Components/Card/History";

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      {/* 🛒 Cart Count passed to Navbar */}
      <Navbar cartCount={cartCount} />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Blog />
              <About />
              <Contact />
            </>
          }
        />

        {/* Category Pages */}
        <Route
          path="/category/:category"
          element={<History setCartCount={setCartCount} />}
        />

        {/* Auth Pages */}
        <Route path="/registrationpage" element={<RegistrationPage />} />
        <Route path="/loginPage" element={<LoginPage />} />

        {/* 404 */}
        <Route path="*" element={<h2 style={{ textAlign: "center" }}>Page Not Found</h2>} />
      </Routes>

      <Footer />
    </>
  );
}
