import React from 'react'
import './remGame.css'

function RemGame({ games, setGames, reference }) {
  const handleRemoveGame = (gameId) => {
    const updatedGames = games.filter(game => game._id !== gameId);
    setGames(updatedGames);
  };

  return (
    <section id="remG" className="remG" ref={reference}>
      <h1>Remove Game</h1>
      <div className="game-list">
        {games.length === 0 ? (
          <p>No games available to remove.</p>
        ) : (
          games.map(game => (
            <div key={game._id} className="game-item">
              <div className="game-info">
                <img src={game.img} alt={game.title} className="game-image" />
                <span>{game.title}</span>
              </div>
              <button className="remove-btn" onClick={() => handleRemoveGame(game._id)}>
                <i className="bi bi-trash"></i> Remove
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default RemGame;
