import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const DeveloperDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Developer Dashboard</h1>
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>
      <div className="user-info">
        <h2>Welcome, {user && user.name}</h2>
        <p>Email: {user && user.email}</p>
        <p>Role: {user && user.role}</p>
      </div>
      <div className="developer-features">
        <h3>Developer Features</h3>
        <ul>
          <li>Project Management</li>
          <li>Code Repository</li>
          <li>Development Tools</li>
        </ul>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
