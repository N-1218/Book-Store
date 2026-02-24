import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

import Home from "./Components/Home/Home";
import Blog from "./Components/Blogs/Blog";
import RegistrationPage from "./Components/Registration/Registrationpage";
import LoginPage from "./Components/LoginPage/LoginPage";
import Contact from "./Components/Contacts/Contact";
import About from "./Components/About/About";
import History from "./Components/Card/History";
import CustomerDashboard from "./Components/AdminPage/CustomerLogin/CustomerDashBoard";

function App() {

  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();

  /* ✅ Pages where Navbar + Footer should be hidden */
  const hideLayoutRoutes = ["/customer-dashboard"];

  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {/* ✅ Show Navbar only on public pages */}
      {!hideLayout && (
        <Navbar
          cartCount={cartCount}
          setSearchTerm={setSearchTerm}
        />
      )}

      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Blog searchTerm={searchTerm} />
              <About />
              <Contact />
            </>
          }
        />

        {/* Category Page */}
        <Route
          path="/category/:category"
          element={<History setCartCount={setCartCount} />}
        />

        {/* View All Page */}
        <Route
          path="/history"
          element={<History setCartCount={setCartCount} />}
        />

        {/* Auth Pages */}
        <Route path="/registrationpage" element={<RegistrationPage />} />
        <Route path="/loginpage" element={<LoginPage />} />

        {/* Dashboard (NO NAVBAR + FOOTER) */}
        <Route
          path="/customer-dashboard"
          element={<CustomerDashboard />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={<h2 style={{ textAlign: "center" }}>Page Not Found</h2>}
        />

      </Routes>

      {/* ✅ Show Footer only on public pages */}
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;