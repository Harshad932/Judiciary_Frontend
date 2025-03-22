import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [publicUser, setPublicUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handlePublicInputChange = (e) => {
    const { name, value } = e.target;
    setPublicUser({ ...publicUser, [name]: value });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setNotification({ message: '', type: '' });

    try {
      const response = await fetch("http://localhost:4000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(publicUser),
        credentials: "include",
      });

      if (response.ok) {
        setNotification({ message: 'Login successful! Redirecting...', type: 'success' });
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 1000);
      } else {
        setNotification({ message: 'Invalid username or password. Please try again.', type: 'error' });
        setLoading(false);
      }
    } catch (err) {
      setNotification({ message: "Login error: " + err.message, type: 'error' });
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/admin/forgotPassword");
  };

  return (
    <div>
      <header>
        <div className="container">
          <nav>
            <a href="/" className="logo">Legal<span>Assist</span></a>
            <a href="/" className="btn">Back to Main Site</a>
          </nav>
        </div>
      </header>

      <div className="admin-login-container">
        <h2>Admin Portal</h2>
        {notification.message && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="adminEmail">Username</label>
            <i className="fas fa-envelope input-icon"></i>
            <input
              type="text"
              id="adminEmail"
              name="username"
              placeholder="Enter your Username"
              value={publicUser.username}
              onChange={handlePublicInputChange}
              required
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="adminPassword">Password</label>
            <i className="fas fa-lock input-icon"></i>
            <input
              type="password"
              id="adminPassword"
              name="password"
              placeholder="Enter your password"
              value={publicUser.password}
              onChange={handlePublicInputChange}
              required
            />
          </div>
          <button 
            type="submit" 
            className={`btn btn-accent ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="form-footer">
          <button className="forgot-password-btn" onClick={handleForgotPassword}>
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
