import React from 'react';
import { scrollToSection } from '../../utils/scrollToSection';

export default function HeroSection() {
  return (
    <section id="home" className="section hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-line">Transforming Ideas</span>
          <span className="title-line">Into Digital Reality</span>
        </h1>
        <p className="hero-subtitle">
          We build cutting-edge software solutions that drive business growth and innovation
        </p>
        <div className="hero-buttons">
          <button 
            onClick={() => scrollToSection('services')} 
            className="btn btn-primary"
          >
            Explore Services
          </button>
          <button 
            onClick={() => scrollToSection('works')} 
            className="btn btn-secondary"
          >
            View Our Work
          </button>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse"></div>
      </div>
    </section>
  );
}

