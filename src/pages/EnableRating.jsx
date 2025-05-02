import React from 'react';
import './enableRating.css';
import { enableFeedback } from '../api/api'; // API fonksiyonunu eklemeyi unutma

function EnableRating({ games, setGames, reference }) {

  const handleEnable = async (gameId) => {
    try {
      const updatedGame = await enableFeedback(gameId); // PATCH /Games/{id}/feedback/enable
      setGames(prev =>
        prev.map(g => g.id === updatedGame.id ? updatedGame : g)
      );
    } catch (err) {
      console.error('Feedback enabling failed:', err);
    }
  };

  return (
    <section id="enaRnC" className="enaRnC" ref={reference}>
      <h1>Enable Rating and Comments</h1>
      <div className="game-list">
        {games.length === 0 ? (
          <p>No games available to enable rating and comments.</p>
        ) : (
          games
            .filter(game => game.isFeedbackEnabled === false)
            .map((game) => (
              <div key={game.id} className="game-item">
                <div className="game-info">
                  <img src={game.img} alt={game.name} className="game-image" />
                  <span>{game.name}</span>
                </div>
                <button className="enable-btn" onClick={() => handleEnable(game.id)}>
                  <i className="bi bi-check-circle"></i> Enable Rating & Comments
                </button>
              </div>
            ))
        )}
      </div>
    </section>
  );
}

export default EnableRating;
