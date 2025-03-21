import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [randomNumber, setRandomNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRandomNumber = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/users/random");
      setRandomNumber(res.data.data.number);
    } catch (err) {
      setError(
        "Failed to fetch random number. Make sure you have admin privileges."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>
      <div className="user-info">
        <h2>Welcome, {user && user.name}</h2>
        <p>Email: {user && user.email}</p>
        <p>Role: {user && user.role}</p>
      </div>

      <div className="admin-features">
        <h3>Admin Features</h3>
        <ul>
          <li>User Management</li>
          <li>System Configuration</li>
          <li>Analytics Dashboard</li>
        </ul>

        <div className="random-number-section">
          <h3>Random Number Generator</h3>        
          <button
            onClick={getRandomNumber}
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Loading..." : "Generate Random Number"}
          </button>

          {randomNumber !== null && (
            <div className="number-display">
              <h4>Your random number is:</h4>
              <div className="random-number">{randomNumber}</div>
            </div>
          )}

          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
