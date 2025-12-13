import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { handleHashLink } from '../utils/scrollToSection';
import './Footer.css';

export default function Footer() {
  const location = useLocation();

  const footerLinks = {
    quickLinks: [
      { name: 'Home', path: '/', isHash: false },
      { name: 'Services', path: 'services', isHash: true },
      { name: 'Our Works', path: 'works', isHash: true },
      { name: 'Products', path: 'products', isHash: true },
    ],
    resources: [
      { name: 'Blogs', path: 'blogs', isHash: true },
      { name: 'Contact', path: 'contact', isHash: true },
      { name: 'Privacy Policy', path: '/privacy-policy', isHash: false },
      { name: 'Terms of Service', path: '/terms-of-service', isHash: false },
    ]
  };

  const onLinkClick = (e, link) => {
    if (link.isHash) {
      handleHashLink(e, link.path);
    } else if (link.path === '/') {
      // Special case for Home to ensure scroll to top if already on home
      if (location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/logo.png" alt="Softin Global" style={{ height: '40px', marginBottom: '1rem' }} />
              <h3>Softin Global</h3>
            </div>
            <p>Transforming businesses through innovative software solutions.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.isHash ? `/#${link.path}` : link.path}
                    onClick={(e) => onLinkClick(e, link)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.isHash ? `/#${link.path}` : link.path}
                    onClick={(e) => onLinkClick(e, link)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://www.linkedin.com/company/softinglobal" aria-label="LinkedIn" target="_blank">LinkedIn</a>
              <a href="https://www.instagram.com/softinglobal/" aria-label="Instagram" target="_blank">Instagram</a>
              <a href="https://www.facebook.com/softinglobal/" aria-label="Facebook" target="_blank">Facebook</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Softin Global. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

