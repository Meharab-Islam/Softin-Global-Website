import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkCard.css';

export default function WorkCard({ work }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/work/${work.id}`);
  };

  return (
    <div className="work-card" onClick={handleClick}>
      <img src={work.image} alt={work.title} className="work-image" />
      <div className="work-content">
        <span className="work-category">{work.category}</span>
        <h3>{work.title}</h3>
        <p>{work.description}</p>
        <div className="work-tech">
          {work.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
        <a href={`/work/${work.id}`} className="work-link" onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}>
          View Details →
        </a>
      </div>
    </div>
  );
}

