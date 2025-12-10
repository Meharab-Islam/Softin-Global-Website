import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThreeScene from '../threejs/ThreeScene';
import WorkCard from '../components/WorkCard';
import { loadWorks } from '../utils/dataLoader';
import './AllItems.css';

export default function AllWorks() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const worksData = await loadWorks();
        setWorks(worksData);
        document.title = 'All Works - Softin Global';
      } catch (error) {
        console.error('Error loading works:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="all-items-page">
      <ThreeScene />
      <main className="main-content">
        <section className="all-items-section">
          <div className="container">
            <button 
              onClick={() => navigate('/')} 
              className="back-button"
            >
              ← Back to Home
            </button>
            <div className="section-header">
              <h1 className="page-title">All Our Works</h1>
              <p className="page-subtitle">
                Explore all our successful projects and client achievements
              </p>
            </div>
            <div className="works-grid">
              {works.map(work => (
                <WorkCard key={work.id} work={work} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

