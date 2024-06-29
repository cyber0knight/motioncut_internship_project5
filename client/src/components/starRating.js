import React from 'react';
import './styles.css';

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const className = index < rating ? 'star filled' : 'star';
    return <span key={index} className={className}>★</span>;
  });

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;