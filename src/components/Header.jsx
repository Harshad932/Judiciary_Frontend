import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header>
      <div className="container">
        <nav>
          <Link to="/" className="logo">
            Legal<span>Assist</span>
          </Link>
          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <Link to="/#features">Features</Link>
            <Link to="/#how-it-works">How It Works</Link>
            <Link to="/#track-case">Track Case</Link>
            <Link to="/#testimonials">Testimonials</Link>
          </div>
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            ☰
          </button>
          <Link to="/chatbot" className="btn">
            AI Assistant
          </Link>
          <Link to="/admin-login" className="btn">
            Admin Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;