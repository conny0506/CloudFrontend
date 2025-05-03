import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { fetchGames, updatePlayTime, addComment, addRating } from '../api/api';
import './gameDetail.css';

function GameDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { games, currentUser, setGames, users } = useContext(AppContext);

  const [game, setGame] = useState(null);
  const [playTime, setPlayTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [ratingValue, setRatingValue] = useState(5);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (games.length > 0) {
      const found = games.find(g => g.id === id);
      if (found) {
        setGame(found);
        const played = found.playedUsers?.find(u => u.userId === currentUser?.id);
        setPlayTime(played?.minutes || 0);
      }
    }
  }, [games, id, currentUser]);

  const handlePlay = () => {
    if (timer) return;
    setStartTime(Date.now());
    const newTimer = setInterval(() => setPlayTime(prev => prev + 1), 1000);
    setTimer(newTimer);
  };

  const handleStop = async () => {
    clearInterval(timer);
    setTimer(null);
    if (!currentUser || !startTime) return;

    const now = Date.now();
    const minutes = Math.floor((now - startTime) / 60000);
    if (minutes <= 0) return;

    try {
      await updatePlayTime(currentUser.id, game.id, minutes);
      const updatedGames = await fetchGames();
      setGames(updatedGames);
      const updated = updatedGames.find(g => g.id === game.id);
      if (updated) setGame(updated);
    } catch (err) {
      console.error('PlayTime güncellenemedi:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser || !commentText.trim()) return;

    if ((currentUserPlay?.minutes || 0) < 60) {
      alert("You must play at least 1 hour before submitting feedback.");
      return;
    }

    try {
      const apiBase = 'https://gamedeliverypaas-api-g7eafbc2a7g5azdm.germanywestcentral-01.azurewebsites.net/api';

      // Eski yorum varsa sil
      const existingComment = game.comments?.find(c => c.userId === currentUser.id);
      if (existingComment) {
        await fetch(`${apiBase}/Games/${game.id}/comments?userId=${currentUser.id}`, {
          method: "DELETE"
        });
      }

      // Eski rating varsa sil
      const existingRating = game.ratings?.find(r => r.userId === currentUser.id);
      if (existingRating) {
        await fetch(`${apiBase}/Games/${game.id}/ratings/${currentUser.id}`, {
          method: "DELETE"
        });
      }

      // Yeni yorum ekle
      await addComment(game.id, {
        userId: currentUser.id,
        content: commentText.trim()
      });

      // Yeni rating ekle
      await addRating(currentUser.id, game.id, ratingValue);

      // Güncel verileri çek
      const updatedGames = await fetchGames();
      setGames(updatedGames);
      const updated = updatedGames.find(g => g.id === game.id);
      if (updated) setGame(updated);

      setCommentText('');
      setRatingValue(5);
    } catch (err) {
      console.error('Yorum ya da rating güncellenemedi:', err);
    }
  };

  if (!game) return <div className="loading">Loading...</div>;

  const currentUserPlay = game.playedUsers?.find(u => u.userId === currentUser?.id);
  const totalMinutes = game.playedUsers?.reduce((acc, p) => acc + (p.minutes || 0), 0) || 0;
  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;

  const getUsernameById = (id) => users.find(u => u.id === id)?.username || "Unknown";

  const hasEnoughPlayTime = (currentUserPlay?.minutes || 0) >= 60;

  const validRatings = game.ratings?.filter(r =>
    users.some(u => u.id === r.userId) || r.userId === currentUser?.id
  ) || [];

  const average = validRatings.length
    ? (
        validRatings.reduce((sum, r) =>
          sum + Number(r.rating ?? r.value ?? r.score ?? 0), 0
        ) / validRatings.length
      ).toFixed(1)
    : "0.0";

  return (
    <div className="game-detail-container">
      <button className="back-button" onClick={() => navigate("/")}>
        <i className="bi bi-arrow-left"></i> Back to Home
      </button>

      <div className="game-card">
        <img src={game.img || '/assets/placeholder.jpg'} alt={game.name} className="game-image" />
        <div className="game-info">
          <h1 className="game-title">{game.name}</h1>

          {game.description && (
            <p className="game-description" style={{ marginTop: '10px' }}>{game.description}</p>
          )}

          <p className="game-desc">
            Genre: <span className="badge">{game.genre || 'Unknown'}</span>
          </p>

          <p><strong>Total Play Time:</strong> {totalHours}h {totalMins}min</p>

          {currentUser && (
            <>
              <p><strong>Your Play Time:</strong> {currentUserPlay?.minutes || 0} min</p>
              {!timer ? (
                <button className="play-button" onClick={handlePlay}>Play Now</button>
              ) : (
                <button className="stop-button" onClick={handleStop}>Stop Playing</button>
              )}
            </>
          )}
        </div>

        {game.isFeedbackEnabled && (
          <div className="rating-comments-container">
            <h4>Rating: {average} / 5</h4>
            <h3>All Comments</h3>
            <ul className="comment-list">
              {game.comments?.map((comment, i) => {
                const username = getUsernameById(comment.userId);
                if (username === "Unknown") return null;
                return (
                  <li key={i}>
                    <strong>{username}</strong>: {comment.content}
                  </li>
                );
              })}
            </ul>

            {currentUser && hasEnoughPlayTime && (
              <form onSubmit={handleCommentSubmit} className="add-comment-form">
                <select value={ratingValue} onChange={(e) => setRatingValue(parseInt(e.target.value))}>
                  {[5, 4, 3, 2, 1].map(v => (
                    <option key={v} value={v}>
                      {v} - {['Excellent', 'Good', 'Average', 'Bad', 'Terrible'][5 - v]}
                    </option>
                  ))}
                </select>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write your comment..."
                />
                <button type="submit">Submit</button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GameDetail;
