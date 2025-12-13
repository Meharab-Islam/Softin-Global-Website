import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import '../HeroSection.css';

export default function HeroSection() {
  const navigate = useNavigate();
  const titleRef = useScrollAnimation();
  const textRef = useScrollAnimation();
  const btnRef = useScrollAnimation();

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title reveal-text">Innovative Software Solutions for Your Business</h1>
        <p ref={textRef} className="hero-subtitle fade-up delay-200">
          We build cutting-edge web applications, mobile apps, and enterprise software to help you grow.
        </p>
        <div ref={btnRef} className="hero-cta fade-up delay-400">
          <button onClick={() => navigate('/#works')} className="btn btn-primary">View Our Work</button>
          <button onClick={() => navigate('/#contact')} className="btn btn-secondary">Contact Us</button>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse"></div>
      </div>
    </section >
  );
}

