import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import ServiceCard from '../ServiceCard';

export default function ServicesSection({ services }) {
  const titleRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation();
  const gridRef = useScrollAnimation();

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="section-header">
          <h2 ref={titleRef} className="section-title reveal-text">Our Services</h2>
          <p ref={subtitleRef} className="section-subtitle fade-up delay-200">
            Comprehensive software solutions tailored to your business needs
          </p>
        </div>
        <div ref={gridRef} className="services-grid fade-up delay-400">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

