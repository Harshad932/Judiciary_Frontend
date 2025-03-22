import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>LegalAssist</h3>
            <p>Simplifying legal access for everyone through technology and innovation.</p>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/#features">Features</Link></li>
              <li><Link to="/#how-it-works">How It Works</Link></li>
              <li><Link to="/#track-case">Track Case</Link></li>
              <li><Link to="/chatbot">AI Assistant</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/documents">Legal Documents</Link></li>
              <li><Link to="/faqs">FAQs</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul>
              <li>Email: info@legalassist.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: Tech Hub, Sector 62, Noida</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2025 LegalAssist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;