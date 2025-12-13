import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import BlogCard from '../BlogCard';

export default function BlogsSection({ blogs }) {
  const displayedBlogs = blogs.slice(0, 3);
  const hasMore = blogs.length > 3;
  const titleRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation();
  const gridRef = useScrollAnimation();

  return (
    <section id="blogs" className="section blogs-section">
      <div className="container">
        <div className="section-header">
          <h2 ref={titleRef} className="section-title reveal-text">Latest Blogs</h2>
          <p ref={subtitleRef} className="section-subtitle fade-up delay-200">
            Insights, trends, and updates from the world of software development
          </p>
        </div>
        <div ref={gridRef} className="blogs-grid fade-up delay-400">
          {displayedBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        {hasMore && (
          <div className="see-more-container fade-up delay-500">
            <Link to="/blogs" className="btn-see-more">
              See All Blogs →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

