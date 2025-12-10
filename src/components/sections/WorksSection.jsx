import React from 'react';
import WorkCard from '../WorkCard';

export default function WorksSection({ works }) {
  return (
    <section id="works" className="section works-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Works</h2>
          <p className="section-subtitle">
            Showcasing our successful projects and client achievements
          </p>
        </div>
        <div className="works-grid">
          {works.map(work => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
}

