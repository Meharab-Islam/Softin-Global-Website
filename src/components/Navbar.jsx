import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { handleHashLink } from '../utils/scrollToSection';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('home'); // Default to home

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Spy Logic
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Active when element is in middle of screen
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = ['home', 'services', 'works', 'products', 'blogs', 'contact'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSectionClick = (e, sectionId) => {
    closeMobileMenu();
    e.preventDefault();
    setActiveSection(sectionId); // Instant update on click

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
            <a
              href="#home"
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={(e) => handleSectionClick(e, 'home')}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#services"
              className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
              onClick={(e) => handleSectionClick(e, 'services')}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#works"
              className={`nav-link ${activeSection === 'works' ? 'active' : ''}`}
              onClick={(e) => handleSectionClick(e, 'works')}
            >
              Our Works
            </a>
          </li>
          <li>
            <a
              href="#products"
              className={`nav-link ${activeSection === 'products' ? 'active' : ''}`}
              onClick={(e) => handleSectionClick(e, 'products')}
            >
              Products
            </a>
          </li>
          <li>
            <a
              href="#blogs"
              className={`nav-link ${activeSection === 'blogs' ? 'active' : ''}`}
              onClick={(e) => handleSectionClick(e, 'blogs')}
            >
              Blogs
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
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

