import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import './gameDetail.css';

function GameDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { games, setGames } = useContext(AppContext);
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (games && games.length > 0) {
      const foundGame = games.find(g => g._id === parseInt(id));
      if (foundGame) {
        setGame(foundGame);
      }
    } else {
      // games boşsa tekrar fetch yapıyoruz
      fetch('/api/gamesData.json')
        .then(res => res.json())
        .then(data => {
          setGames(data); // AppContext'e veriyi koy
          const foundGame = data.find(g => g._id === parseInt(id));
          if (foundGame) {
            setGame(foundGame);
          }
        })
        .catch(err => console.log('Error fetching game details:', err));
    }
  }, [id, games, setGames]);

  if (!game) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="game-detail-container">
      <button className="back-button" onClick={() => navigate("/")}>
        <i className="bi bi-arrow-left"></i> Back to Home
      </button>

      {!game.disableRating && (
        <div className="rating-comments-container">
          <h4>RATING: {game.rating} / 5</h4>
          <h3>ALL COMMENTS</h3>
          <ul className="comment-list">
            {game.users.map((user, index) => (
              <li key={index}>
                <strong>{user.name}</strong> ({user.playTime}h, Rating: {user.rating}): {user.comment}
              </li>
            ))}
          </ul>
        </div>
      )}

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
          <h3>ABOUT THIS GAME</h3>
          <p>{game.description}</p>
          <p><strong>Developer:</strong> {game.developer}</p>
          <p><strong>Release Year:</strong> {game.releaseYear}</p>
          <p><strong>Total Play Time of Users:</strong> {game.users.reduce((acc, user) => acc + user.playTime, 0)} hours</p>
        </div>
      </div>
    </div>
  );
}

export default GameDetail;
