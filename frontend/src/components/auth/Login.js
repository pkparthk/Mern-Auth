import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [activeTab, setActiveTab] = useState("developer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "developer",
  });
  const [alert, setAlert] = useState(null);

  const { email, password } = formData;
  const { login, isAuthenticated, error, clearError, user } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "developer") {
        navigate("/developer");
      }
    }

    if (error) {
      setAlert(error);
      clearError();
    }
  }, [isAuthenticated, user, error, clearError, navigate]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const switchTab = (tab) => {
    setActiveTab(tab);
    setFormData({ ...formData, role: tab });
    setAlert(null);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="form-container">
      <h1>Account Login</h1>

      <div className="tab-container">
        <div
          className={`tab ${activeTab === "developer" ? "active" : ""}`}
          onClick={() => switchTab("developer")}
        >
          Developer
        </div>
        <div
          className={`tab ${activeTab === "admin" ? "active" : ""}`}
          onClick={() => switchTab("admin")}
        >
          Admin
        </div>
      </div>

      {alert && <div className="alert alert-danger">{alert}</div>}

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div className="button-wrapper">
          <button type="submit" className="btn btn-primary">
            Login as {activeTab === "admin" ? "Admin" : "Developer"}
          </button>
        </div>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
