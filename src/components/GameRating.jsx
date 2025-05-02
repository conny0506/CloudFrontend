import React, { useState, useEffect } from 'react';
import './gameRating.css';

function GameRating({ rating }) {
  const [fullStars, setFullStars] = useState(0);
  const [emptyStars, setEmptyStars] = useState(0);

  useEffect(() => {
    const validRating = typeof rating === 'number' && rating >= 0 && rating <= 5
      ? Math.floor(rating)
      : 0;
    setFullStars(validRating);
    setEmptyStars(5 - validRating);
  }, [rating]);

  return (
    <div className="gameRating">
      {[...Array(fullStars)].map((_, i) => (
        <i key={`full-${i}`} className="bi bi-star-fill"></i>
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <i key={`empty-${i}`} className="bi bi-star"></i>
      ))}
    </div>
  );
}

export default GameRating;
