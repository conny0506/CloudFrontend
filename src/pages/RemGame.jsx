import React from 'react';
import './remGame.css';
import { deleteGame } from '../api/api';

function RemGame({ games, setGames, reference }) {
  const handleRemoveGame = async (gameId) => {
    const confirmed = window.confirm("Are you sure you want to delete this game?");
    if (!confirmed) return;

    try {
      const success = await deleteGame(gameId);
      if (success) {
        setGames(prev => prev.filter(game => game.id !== gameId));
      }
    } catch (err) {
      console.error("Game could not be deleted:", err);
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
            <div key={game.id} className="game-item">
              <div className="game-info">
                <img src={game.img} alt={game.name} className="game-image" />
                <span>{game.name}</span>
              </div>
              <button className="remove-btn" onClick={() => handleRemoveGame(game.id)}>
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
