import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-content">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-price">{product.price}</div>
        <div className="product-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span>{product.rating} ({product.reviews} reviews)</span>
        </div>
        <a 
          href={`/product/${product.id}`} 
          className="product-link"
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          Learn More →
        </a>
      </div>
    </div>
  );
}

