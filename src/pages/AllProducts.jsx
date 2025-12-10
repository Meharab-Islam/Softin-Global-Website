import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThreeScene from '../threejs/ThreeScene';
import ProductCard from '../components/ProductCard';
import { loadProducts } from '../utils/dataLoader';
import './AllItems.css';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await loadProducts();
        setProducts(productsData);
        document.title = 'All Products - Softin Global';
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
              <h1 className="page-title">All Our Products</h1>
              <p className="page-subtitle">
                Discover all our ready-to-use software solutions
              </p>
            </div>
            <div className="products-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

