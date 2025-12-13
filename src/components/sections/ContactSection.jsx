import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function ContactSection({ onSubmit }) {
  const titleRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation();
  const contentRef = useScrollAnimation();

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <h2 ref={titleRef} className="section-title reveal-text">Get In Touch</h2>
          <p ref={subtitleRef} className="section-subtitle fade-up delay-200">
            Let's discuss how we can help transform your business
          </p>
        </div>
        <div ref={contentRef} className="contact-content glass-card fade-up delay-300">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <h3>Email</h3>
                <p>info@softinglobal.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <h3>Phone</h3>
                <p>+880 1837387206, +880 1410387206</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <h3>Address</h3>
                <p>3rd Floor, Razzak Plaza, Kathpotti, Jhiltuli, Faridpur Shadar, Faridpur</p>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={onSubmit}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

