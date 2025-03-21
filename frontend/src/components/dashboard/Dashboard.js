import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/developer");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Redirecting to your role-specific dashboard...</p>
    </div>
  );
};

export default Dashboard;
