import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerDashBoard.css";

function CustomerDashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  /* ✅ Load User */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/loginpage");
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      localStorage.removeItem("user");
      navigate("/loginpage");
    }
  }, [navigate]);

  /* ✅ Logout */
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/loginpage");
  };

  return (
    <div className="dashboard-container">

      {/* ===== Sidebar ===== */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>

        {/* Sidebar Header */}
        <div className="sidebar-header">

          {sidebarOpen && <h2 className="logo">Customer</h2>}

          {/* ⭐ Arrow Toggle */}
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "⬅" : "➡"}
          </button>

        </div>

        <ul className="menu">
          <li className="active">🏠 <span>Dashboard</span></li>
          <li>🛒 <span>My Orders</span></li>
          <li>❤️ <span>Wishlist</span></li>
          <li>👤 <span>Profile</span></li>
          <li>⚙ <span>Settings</span></li>
          <li className="logout" onClick={logout}>🚪 <span>Logout</span></li>
        </ul>

      </div>

      {/* ===== Main Content ===== */}
      <div className="main-content">

        <div className="dashboard-header">
          <h2>
            Welcome {user?.firstName || "User"} 👋
          </h2>

          <p>Manage your account and activities here</p>
        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>15</p>
          </div>

          <div className="stat-card">
            <h3>Wishlist</h3>
            <p>6</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default CustomerDashboard;
