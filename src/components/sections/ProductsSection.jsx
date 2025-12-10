import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';

export default function ProductsSection({ products }) {
  const displayedProducts = products.slice(0, 3);
  const hasMore = products.length > 3;

  return (
    <section id="products" className="section products-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Products</h2>
          <p className="section-subtitle">
            Ready-to-use software solutions for your business
          </p>
        </div>
        <div className="products-grid">
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {hasMore && (
          <div className="see-more-container">
            <Link to="/products" className="btn-see-more">
              See All Products →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

