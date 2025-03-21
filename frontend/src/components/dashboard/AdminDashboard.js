import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);

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
      </div>
    </div>
  );
};

export default AdminDashboard;
