import React from 'react';
import ServiceCard from '../ServiceCard';

export default function ServicesSection({ services }) {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive software solutions tailored to your business needs
          </p>
        </div>
        <div className="services-grid">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

