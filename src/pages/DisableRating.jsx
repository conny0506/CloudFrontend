import React from 'react';
import './disableRating.css';

function DisableRating({ games, setGames, reference }) {
  
  const handleDisable = (gameId) => {
    const updatedGames = games.map(game => {
      if (game._id === gameId) {
        return { ...game, disableRating: true };
      }
      return game;
    });
    setGames(updatedGames);
  };

  return (
    <section id="disRnC" className="disRnC" ref={reference}>
      <h1>Disable Rating and Comments</h1>
      <div className="game-list">
        {games.length === 0 ? (
          <p>No games available.</p>
        ) : (
          games.map((game) => (
            <div key={game._id} className="game-item">
              <div className="game-info">
                <img src={game.img} alt={game.title} />
                <span>{game.title}</span>
              </div>
              <button 
                className="disable-btn" 
                onClick={() => handleDisable(game._id)}
                disabled={game.disableRating} // zaten disable edilmişse buton pasif olsun
              >
                {game.disableRating ? 'Disabled' : 'Disable'}
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default DisableRating;
