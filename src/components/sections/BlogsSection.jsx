import React from 'react';
import BlogCard from '../BlogCard';

export default function BlogsSection({ blogs }) {
  return (
    <section id="blogs" className="section blogs-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Latest Blogs</h2>
          <p className="section-subtitle">
            Insights, trends, and updates from the world of software development
          </p>
        </div>
        <div className="blogs-grid">
          {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}

