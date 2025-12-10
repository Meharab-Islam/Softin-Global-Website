import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ThreeScene from '../threejs/ThreeScene';
import { getBlogById } from '../utils/dataLoader';
import './DetailPage.css';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBlogById(id);
        if (!blogData) {
          navigate('/');
          return;
        }
        setBlog(blogData);
        document.title = `${blogData.title} - Softin Global`;
      } catch (error) {
        console.error('Error loading blog:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="detail-page-wrapper">
      <ThreeScene />
      <main className="main-content">
        <section className="detail-page">
          <div className="container">
            <button 
              onClick={() => navigate('/#blogs')} 
              className="back-button"
            >
              ← Back to Blogs
            </button>
            <div className="detail-header">
              <span className="blog-category">{blog.category}</span>
              <h1>{blog.title}</h1>
              <div className="meta">
                <span>By {blog.author}</span> • 
                <span>{new Date(blog.date).toLocaleDateString()}</span>
              </div>
            </div>
            <img src={blog.image} alt={blog.title} className="detail-image" />
            <div className="detail-content">
              <p>{blog.content}</p>
              <div className="blog-tags">
                <h3>Tags</h3>
                <div className="tags-container">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="tech-tag">{tag}</span>
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

