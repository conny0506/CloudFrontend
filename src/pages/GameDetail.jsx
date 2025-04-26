import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './gameDetail.css';

function GameDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch('/api/gamesData.json')
      .then(res => res.json())
      .then(data => {
        const foundGame = data.find(game => game._id === parseInt(id));
        if (foundGame) {
          setGame(foundGame);
        }
      })
      .catch(err => console.log('Error fetching game details:', err));
  }, [id]);

  if (!game) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="game-detail-container">

      {/* Sağ üst köşe için Rating ve Comments */}
      <div className={`rating-comments-container ${game.disableRating ? 'hide' : ''}`}>
        <h4>Rating: {game.rating} / 5</h4>
        <h3>All Comments</h3>
        <ul className="comment-list">
          {game.users.map((user, index) => (
            <li key={index}>
              <strong>{user.name}</strong> ({user.playTime}h, Rating: {user.rating}): {user.comment}
            </li>
          ))}
        </ul>
      </div>

      {/* Ana Oyun Kartı */}
      <div className="game-card">
        <img src={game.img} alt={game.title} className="game-image" />
        <div className="game-info">
          <h1 className="game-title">{game.title}</h1>
          <p className="game-desc">
            Level: <span className={`badge ${game.level.toLowerCase()}`}>{game.level}</span>
          </p>
          <p className="game-price">Price: ${game.price}</p>
          <button className="play-button">Play Now</button>
        </div>

        <div className="info-box">
          <h3>About This Game</h3>
          <p>{game.description}</p>
          <p><strong>Developer:</strong> {game.developer}</p>
          <p><strong>Release Year:</strong> {game.releaseYear}</p>
        </div>

        {/* Geri Butonu */}
        <button className="back-button" onClick={() => navigate("/")}>
          <i className="bi bi-arrow-left"></i> Back to Home
        </button>
      </div>

    </div>
  );
}

export default GameDetail;
