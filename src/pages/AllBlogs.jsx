import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThreeScene from '../threejs/ThreeScene';
import BlogCard from '../components/BlogCard';
import { loadBlogs } from '../utils/dataLoader';
import './AllItems.css';

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsData = await loadBlogs();
        setBlogs(blogsData);
        document.title = 'All Blogs - Softin Global';
      } catch (error) {
        console.error('Error loading blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
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
              <h1 className="page-title">All Our Blogs</h1>
              <p className="page-subtitle">
                Read all our insights, trends, and updates from the world of software development
              </p>
            </div>
            <div className="blogs-grid">
              {blogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

