import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import WorkCard from '../WorkCard';

export default function WorksSection({ works }) {
  const displayedWorks = works.slice(0, 3);
  const hasMore = works.length > 3;
  const titleRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation();
  const gridRef = useScrollAnimation();

  return (
    <section id="works" className="section works-section">
      <div className="container">
        <div className="section-header">
          <h2 ref={titleRef} className="section-title reveal-text">Our Works</h2>
          <p ref={subtitleRef} className="section-subtitle fade-up delay-200">
            Showcasing our successful projects and client achievements
          </p>
        </div>
        <div ref={gridRef} className="works-grid fade-up delay-400">
          {displayedWorks.map(work => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
        {hasMore && (
          <div className="see-more-container fade-up delay-500">
            <Link to="/works" className="btn-see-more">
              See All Works →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

