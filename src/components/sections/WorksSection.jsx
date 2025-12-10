import React from 'react';
import { Link } from 'react-router-dom';
import WorkCard from '../WorkCard';

export default function WorksSection({ works }) {
  const displayedWorks = works.slice(0, 3);
  const hasMore = works.length > 3;

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
          {displayedWorks.map(work => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
        {hasMore && (
          <div className="see-more-container">
            <Link to="/works" className="btn-see-more">
              See All Works →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

