import React from 'react';
import './enableRating.css';

function EnableRating({ games, setGames, reference }) {

  const handleEnable = (gameId) => {
    // Sadece disable olan oyunları aktif hale getiriyoruz
    const updatedGames = games.map(game => {
      if (game._id === gameId && game.disableRating) {  // Yalnızca disableRating: true olanları aktif yapıyoruz
        return { ...game, disableRating: false };  // disableRating'yi false yaparak aktif hale getiriyoruz
      }
      return game;
    });
    setGames(updatedGames);  // Güncellenmiş oyunları state'e kaydediyoruz
  };

  return (
    <section id="enaRnC" className="enaRnC" ref={reference}>
      <h1>Enable Rating and Comments</h1>
      <div className="game-list">
        {games.length === 0 ? (
          <p>No games available to enable rating and comments.</p>
        ) : (
          games
            .filter(game => game.disableRating) // Yalnızca disable olan oyunları filtreliyoruz
            .map((game) => (
              <div key={game._id} className="game-item">
                <div className="game-info">
                  <img src={game.img} alt={game.title} className="game-image" />
                  <span>{game.title}</span>
                </div>
                <button className="enable-btn" onClick={() => handleEnable(game._id)}>
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
