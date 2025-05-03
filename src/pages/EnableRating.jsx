import React, { useState } from 'react';
import './enableRating.css';
import { enableFeedback, fetchGames } from '../api/api';

function EnableRating({ games, setGames, reference }) {
  const [message, setMessage] = useState('');

  const handleEnable = async (game) => {
    try {
      await enableFeedback(game); // başarılı işlem

      const updatedGames = await fetchGames(); // verileri tazele
      setGames(updatedGames); // context’i güncelle

      setMessage(`"${game.name}" feedback enabled successfully!`);

      setTimeout(() => setMessage(''), 3000); // mesajı 3 saniye sonra temizle
    } catch (err) {
      console.error('Enable işlemi başarısız:', err.response?.data || err.message);
      alert("Feedback aktifleştirilemedi.");
    }
  };

  const disabledGames = games.filter(game => game.isFeedbackEnabled !== true);

  return (
    <section id="enaRnC" className="enaRnC" ref={reference}>
      <h1>Enable Rating and Comments</h1>

      {message && <div className="success-message">{message}</div>}

      <div className="game-list">
        {disabledGames.length === 0 ? (
          <p>All games already have feedback enabled.</p>
        ) : (
          disabledGames.map((game) => (
            <div key={game.id} className="game-item">
              <div className="game-info">
                <img src={game.img} alt={game.name} />
                <span>{game.name}</span>
              </div>
              <button className="enable-btn" onClick={() => handleEnable(game)}>
                Enable
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default EnableRating;
