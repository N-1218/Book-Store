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
import CustomerDashboard from "./Components/AdminPage/CustomerLogin/CustomerDashBoard";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const hideLayoutRoutes = ["/customer-dashboard"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar cartCount={cartCount} setSearchTerm={setSearchTerm} />}

      <Routes>
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
        <Route path="/registrationpage" element={<RegistrationPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;