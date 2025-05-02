import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { updatePlayTime, addComment } from '../api/api'; // <== Entegrasyon burada
import './gameDetail.css';

function GameDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { games, currentUser, setGames } = useContext(AppContext);

  const [game, setGame] = useState(null);
  const [playTime, setPlayTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [ratingValue, setRatingValue] = useState(5);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (games.length > 0) {
      const found = games.find(g => g.id === id);
      if (found) {
        setGame(found);
        const played = found.playedUsers?.find(u => u.username === currentUser?.username);
        setPlayTime(played?.playTime || 0);
      }
    }
  }, [games, id, currentUser]);

  const handlePlay = () => {
    if (timer) return;
    const newTimer = setInterval(() => setPlayTime(prev => prev + 1), 1000);
    setTimer(newTimer);
  };

  const handleStop = async () => {
    clearInterval(timer);
    setTimer(null);

    if (!currentUser) return;

    try {
      const updatedGame = await updatePlayTime(game.id, currentUser.username, playTime);

      // Game listesini güncelle (context içindeki games’i)
      setGames(prevGames =>
        prevGames.map(g => g.id === updatedGame.id ? updatedGame : g)
      );

      setGame(updatedGame); // mevcut ekran da güncellensin
    } catch (err) {
      console.error('PlayTime güncellenemedi:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser || !commentText.trim()) return;

    try {
      const updatedGame = await addComment(game.id, {
        username: currentUser.username,
        rating: ratingValue,
        playTime: playTime,
        content: commentText.trim()
      });

      setGames(prevGames =>
        prevGames.map(g => g.id === updatedGame.id ? updatedGame : g)
      );

      setGame(updatedGame); // yorum hemen görünsün
      setCommentText('');
      setRatingValue(5);
    } catch (err) {
      console.error('Yorum gönderilemedi:', err);
    }
  };

  if (!game) return <div className="loading">Loading...</div>;

  return (
    <div className="game-detail-container">
      <button className="back-button" onClick={() => navigate("/")}>
        <i className="bi bi-arrow-left"></i> Back to Home
      </button>

      <div className="game-card">
        <img src={game.img || '/assets/placeholder.jpg'} alt={game.name} className="game-image" />
        <div className="game-info">
          <h1 className="game-title">{game.name}</h1>
          <p className="game-desc">
            Genre: <span className="badge">{game.genre || 'Unknown'}</span>
          </p>
          <p><strong>Total Play Time:</strong> {game.totalPlayTime || 0}h</p>

          {currentUser && (
            <>
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
            <h4>Rating: {(game.averageRating || 0).toFixed(1)} / 5</h4>
            <h3>All Comments</h3>
            <ul className="comment-list">
              {game.comments?.map((comment, i) => (
                <li key={i}>
                  <strong>{comment.username}</strong> ({comment.playTime}h, Rating: {comment.rating}): {comment.content}
                </li>
              ))}
            </ul>

            {currentUser && (
              <form onSubmit={handleCommentSubmit} className="add-comment-form">
                <select value={ratingValue} onChange={(e) => setRatingValue(parseInt(e.target.value))}>
                  {[5, 4, 3, 2, 1].map(v => <option key={v} value={v}>{v} - {['Terrible', 'Bad', 'Average', 'Good', 'Excellent'][5 - v]}</option>)}
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
