import React, { useState } from 'react';
import './disableRating.css';
import { disableFeedback, fetchGames } from '../api/api';

function DisableRating({ games, setGames, reference }) {
  const [message, setMessage] = useState('');

  const handleDisable = async (game) => {
    try {
      await disableFeedback(game.id);

      const updatedGames = await fetchGames();
      setGames(updatedGames);

      setMessage(`"${game.name}" feedback disabled successfully!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Disable işlemi başarısız:', err.response?.data || err.message);
      alert("Feedback devre dışı bırakılamadı.");
    }
  };

  const enabledGames = games.filter(game => game.isFeedbackEnabled === true);

  return (
    <section id="disRnC" className="disRnC" ref={reference}>
      <h1>Disable Rating and Comments</h1>

      {message && <div className="success-message">{message}</div>}

      <div className="game-list">
        {enabledGames.length === 0 ? (
          <p>All games already have feedback disabled.</p>
        ) : (
          enabledGames.map((game) => (
            <div key={game.id} className="game-item">
              <div className="game-info">
                <img src={game.img} alt={game.name} />
                <span>{game.name}</span>
              </div>
              <button className="disable-btn" onClick={() => handleDisable(game)}>
                Disable
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default DisableRating;
