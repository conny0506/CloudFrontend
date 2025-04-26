import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./gameDetail.css";

function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch("/api/gamesData.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((g) => g._id === parseInt(id));
        if (found) {
          found.users.sort((a, b) => b.playTime - a.playTime);

          const totalPlayTime = found.users.reduce((acc, u) => acc + u.playTime, 0);
          const totalWeighted = found.users.reduce((acc, u) => acc + u.playTime * u.rating, 0);
          found.rating = totalPlayTime === 0 ? 0 : Math.round(totalWeighted / totalPlayTime);

          setGame(found);
        }
      });
  }, [id]);

  if (!game) return <div className="loading">Loading...</div>;

  return (
    <div className="game-detail-container">
      <div className="game-card">
        {/* Oyun Görseli */}
        <img src={game.img} alt={game.title} className="game-image" />
        
        {/* Oyun Bilgileri */}
        <div className="game-info">
          <h1 className="game-title">{game.title}</h1>

          <p className="game-desc">
            Level: <span className={`badge ${game.level.toLowerCase()}`}>{game.level}</span>
          </p>
          <p className="game-price">Price: ${game.price}</p>
          <button className="play-button">Play Now</button>
        </div>

        {/* Oyun Hakkında ve Yorumlar */}
        <div className="info-box">
          <h3>About This Game</h3>
          <p>{game.description}</p>
          <p><strong>Developer:</strong> {game.developer}</p>
          <p><strong>Release Year:</strong> {game.releaseYear}</p>
        </div>

        {/* Rating ve Comments */}
        <div className={`rating-comments-container ${game.disableRating ? 'hide' : ''}`}>
          <h4>Rating: {game.rating} / 5</h4>
          <h3>All Comments</h3>
          <ul className="comment-list">
            {game.users.map((user, index) => (
              <li key={index}>
                <strong>{user.name}</strong> ({user.playTime}h, Rating: {user.rating}): {user.comment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GameDetail;
