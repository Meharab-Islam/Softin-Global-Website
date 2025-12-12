import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ThreeScene from '../threejs/ThreeScene';
import { getProductById } from '../utils/dataLoader';
import './DetailPage.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        if (!productData) {
          navigate('/');
          return;
        }
        setProduct(productData);
        document.title = `${productData.name} - Softin Global`;
      } catch (error) {
        console.error('Error loading product:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return null;
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
  };

  return (
    <div className="detail-page-wrapper">
      <ThreeScene />
      <main className="main-content">
        <section className="detail-page">
          <div className="container">
            <button
              onClick={() => navigate('/#products')}
              className="back-button"
            >
              ← Back to Products
            </button>
            <div className="glass-container">
              <div className="detail-header">
                <h1>{product.name}</h1>
                <div className="meta">
                  <span>{product.category}</span> •
                  <span>{product.price}</span> •
                  <span>Launched: {new Date(product.launch_date).toLocaleDateString()}</span>
                </div>
              </div>
              <img src={product.image} alt={product.name} className="detail-image" />
              <div className="detail-content">
                <p>{product.description}</p>
                <div className="product-rating" style={{ margin: '2rem 0' }}>
                  <span className="stars">{renderStars(product.rating)}</span>
                  <span>{product.rating} out of 5 ({product.reviews} reviews)</span>
                </div>
                <h2>Key Features</h2>
                <ul className="features-list">
                  {product.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="cta-section">
                  <a href="/#contact" className="btn btn-primary">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

