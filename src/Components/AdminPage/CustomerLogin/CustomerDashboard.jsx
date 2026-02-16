import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";

function CustomerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/loginpage");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/loginpage");
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">📚 BookStore</h2>

        <ul className="menu">
          <li className="active">Dashboard</li>
          <li>Orders</li>
          <li>Wishlist</li>
          <li>Profile</li>
          <li>Settings</li>
          <li className="logout" onClick={logout}>Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <header className="dashboard-header">
          <div>
            <h2>Welcome, {user?.firstName || "Customer"} 👋</h2>
            <p>Here is your dashboard overview</p>
          </div>

          <div className="profile-circle">
            {user?.firstName?.charAt(0)}
          </div>
        </header>

        {/* Stats Cards */}
        <section className="stats-grid">

          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>12</p>
          </div>

          <div className="stat-card">
            <h3>Wishlist Items</h3>
            <p>5</p>
          </div>

        </section>

        {/* Quick Actions */}
        <section className="action-section">

          <h3>Quick Actions</h3>

          <div className="action-grid">

            <button>View Orders</button>
            <button>Open Wishlist</button>
            <button>Edit Profile</button>
            <button>Contact Support</button>

          </div>
        </section>

      </main>
    </div>
  );
}

export default CustomerDashboard;
