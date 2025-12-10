import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogCard.css';

export default function BlogCard({ blog }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${blog.id}`);
  };

  return (
    <div className="blog-card" onClick={handleClick}>
      <img src={blog.image} alt={blog.title} className="blog-image" />
      <div className="blog-content">
        <span className="blog-category">{blog.category}</span>
        <h3>{blog.title}</h3>
        <p>{blog.excerpt}</p>
        <div className="blog-meta">
          <span>By {blog.author}</span>
          <span>{new Date(blog.date).toLocaleDateString()}</span>
        </div>
        <a 
          href={`/blog/${blog.id}`} 
          className="blog-link"
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          Read More →
        </a>
      </div>
    </div>
  );
}

