import React, { useState, useEffect } from 'react';
import './gameRating.css';

function GameRating({ rating }) {
  const [stars, setStars] = useState([]);

  const generateStars = () => {
    const starArray = [];
    for (let i = 0; i < rating; i++) {
      starArray.push(i);
    }
    return starArray;
  };

  useEffect(() => {
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      setStars([]);
      return;
    }

    setStars(generateStars());
  }, [rating]);

  return (
    <div className="gameRating">
      {stars.map((star, index) => (
        <i key={index} className="bi bi-star-fill"></i>
      ))}
    </div>
  );
}

export default GameRating;
