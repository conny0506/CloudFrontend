import React from 'react';
import './remGame.css';
import { deleteGame } from '../api/gamesApi';

function RemGame({ games, fetchGames, reference }) {
  const handleRemoveGame = async (gameId) => {
    try {
      await deleteGame(gameId);
      alert("Game removed successfully.");
      fetchGames(); // games listesini güncellemek için
    } catch (err) {
      alert("Failed to remove game.");
    }
  };

  return (
    <section id="remG" className="remG" ref={reference}>
      <h1>Remove Game</h1>
      <div className="game-list">
        {games.length === 0 ? (
          <p>No games available to remove.</p>
        ) : (
          games.map(game => (
            <div key={game.id || game._id} className="game-item">
              <div className="game-info">
                <img src={game.img} alt={game.title || game.name} className="game-image" />
                <span>{game.title || game.name}</span>
              </div>
              <button className="remove-btn" onClick={() => handleRemoveGame(game.id || game._id)}>
                <i className="bi bi-trash"></i> Remove
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default RemGame;
