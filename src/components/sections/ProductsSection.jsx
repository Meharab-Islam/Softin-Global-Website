import React from 'react';
import ProductCard from '../ProductCard';

export default function ProductsSection({ products }) {
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
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

