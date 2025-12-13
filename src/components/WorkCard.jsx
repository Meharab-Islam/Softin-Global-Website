import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkCard.css';

export default function WorkCard({ work }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/work/${work.id}`);
  };

  return (
    <div className="work-card fade-up" onClick={handleClick}>
      <div className="work-category">{work.category}</div>
      <div className="work-image-container">
        <img src={work.image} alt={work.title} className="work-image" />
      </div>
      <div className="work-content">
        <h3>{work.title}</h3>
        <p>{work.description}</p>
        <div className="work-tech">
          {work.technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className="tech-tag">#{tech}</span>
          ))}
        </div>
      </div>
      <a href={`/work/${work.id}`} className="work-link" onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}>
        →
      </a>
    </div>
  );
}

