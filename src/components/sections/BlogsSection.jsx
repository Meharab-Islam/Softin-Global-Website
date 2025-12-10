import React from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../BlogCard';

export default function BlogsSection({ blogs }) {
  const displayedBlogs = blogs.slice(0, 3);
  const hasMore = blogs.length > 3;

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
          {displayedBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        {hasMore && (
          <div className="see-more-container">
            <Link to="/blogs" className="btn-see-more">
              See All Blogs →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

