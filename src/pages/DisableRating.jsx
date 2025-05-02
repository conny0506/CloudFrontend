import React from 'react';
import './disableRating.css';
import { disableFeedback } from '../api/api'; // API fonksiyonu dahil

function DisableRating({ games, setGames, reference }) {
  const handleDisable = async (gameId) => {
    try {
      const updatedGame = await disableFeedback(gameId);
      setGames(prev =>
        prev.map(g => g.id === updatedGame.id ? updatedGame : g)
      );
    } catch (err) {
      console.error('Feedback disabling failed:', err);
    }
  };

  return (
    <section id="disRnC" className="disRnC" ref={reference}>
      <h1>Disable Rating and Comments</h1>
      <div className="game-list">
        {games.length === 0 ? (
          <p>No games available.</p>
        ) : (
          games.map((game) => (
            <div key={game.id} className="game-item">
              <div className="game-info">
                <img src={game.img} alt={game.name} />
                <span>{game.name}</span>
              </div>
              <button
                className="disable-btn"
                onClick={() => handleDisable(game.id)}
                disabled={game.isFeedbackEnabled === false}
              >
                {game.isFeedbackEnabled === false ? 'Disabled' : 'Disable'}
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default DisableRating;
