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

  /*  Hide Navbar + Footer on Dashboard */
  const hideLayoutRoutes = ["/customer-dashboard"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      {!hideLayout && (
        <Navbar
          cartCount={cartCount}
          setSearchTerm={setSearchTerm}
        />
      )}

      {/* ================= ROUTES ================= */}
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

        {/* Category */}
        <Route
          path="/category/:category"
          element={<History setCartCount={setCartCount} />}
        />

        <Route
          path="/history"
          element={<History setCartCount={setCartCount} />}
        />

        {/* Auth Pages */}
        <Route path="/registrationpage" element={<RegistrationPage />} />
        <Route path="/loginpage" element={<LoginPage />} />

        {/* ✅ FIXED DASHBOARD ROUTE */}
        <Route path="/dashboard" element={<CustomerDashboard />} />

        {/* Page Not Found */}
        <Route path="*" element={<h2>Page Not Found</h2>} />

      </Routes>

      {/* ================= FOOTER ================= */}
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;