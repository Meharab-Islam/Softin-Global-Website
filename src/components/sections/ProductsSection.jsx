import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import ProductCard from '../ProductCard';

export default function ProductsSection({ products }) {
  const displayedProducts = products.slice(0, 3);
  const hasMore = products.length > 3;
  const titleRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation();
  const gridRef = useScrollAnimation();

  return (
    <section id="products" className="section products-section">
      <div className="container">
        <div className="section-header">
          <h2 ref={titleRef} className="section-title reveal-text">Our Products</h2>
          <p ref={subtitleRef} className="section-subtitle fade-up delay-200">
            Ready-to-use software solutions for your business
          </p>
        </div>
        <div ref={gridRef} className="products-grid fade-up delay-400">
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {hasMore && (
          <div className="see-more-container fade-up delay-500">
            <Link to="/products" className="btn-see-more">
              See All Products →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

