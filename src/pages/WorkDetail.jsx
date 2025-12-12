import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ThreeScene from '../threejs/ThreeScene';
import { getWorkById } from '../utils/dataLoader';
import './DetailPage.css';

export default function WorkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const workData = await getWorkById(id);
        if (!workData) {
          navigate('/');
          return;
        }
        setWork(workData);
        document.title = `${workData.title} - Softin Global`;
      } catch (error) {
        console.error('Error loading work:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchWork();
  }, [id, navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!work) {
    return null;
  }

  return (
    <div className="detail-page-wrapper">
      <ThreeScene />
      <main className="main-content">
        <section className="detail-page">
          <div className="container">
            <button
              onClick={() => navigate('/#works')}
              className="back-button"
            >
              ← Back to Works
            </button>
            <div className="glass-container">
              <div className="detail-header">
                <h1>{work.title}</h1>
                <div className="meta">
                  <span>{work.category}</span> •
                  <span>{work.client}</span> •
                  <span>{work.year}</span> •
                  <span>{work.duration}</span>
                </div>
              </div>
              <img src={work.image} alt={work.title} className="detail-image" />
              <div className="detail-content">
                <p>{work.description}</p>
                <h2>Technologies Used</h2>
                <div className="work-tech" style={{ margin: '2rem 0' }}>
                  {work.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <h2>Results</h2>
                <div className="results-grid">
                  {Object.entries(work.results).map(([key, value]) => (
                    <div key={key} className="result-card">
                      <div className="result-value">{value}</div>
                      <div className="result-label">
                        {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

