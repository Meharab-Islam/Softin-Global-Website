import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { handleHashLink } from '../utils/scrollToSection';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleSectionClick = (e, sectionId) => {
    closeMobileMenu();
    e.preventDefault();

    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation and render
      setTimeout(() => {
        // Pass the event object as null or a mock since the original event is stale
        handleHashLink({ preventDefault: () => { } }, sectionId);
      }, 400);
    } else {
      handleHashLink(e, sectionId);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo">
          <Link to="/" onClick={closeMobileMenu}>
            <span className="logo-text">Softin Global</span>
          </Link>
        </div>
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href="#services"
              className="nav-link"
              onClick={(e) => handleSectionClick(e, 'services')}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#works"
              className="nav-link"
              onClick={(e) => handleSectionClick(e, 'works')}
            >
              Our Works
            </a>
          </li>
          <li>
            <a
              href="#products"
              className="nav-link"
              onClick={(e) => handleSectionClick(e, 'products')}
            >
              Products
            </a>
          </li>
          <li>
            <a
              href="#blogs"
              className="nav-link"
              onClick={(e) => handleSectionClick(e, 'blogs')}
            >
              Blogs
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="nav-link"
              onClick={(e) => handleSectionClick(e, 'contact')}
            >
              Contact
            </a>
          </li>
        </ul>
        <div
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

