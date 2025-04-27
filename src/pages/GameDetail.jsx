import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import './gameDetail.css';

function GameDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { games, users, currentUser, setUsers } = useContext(AppContext);

  const [game, setGame] = useState(null);
  const [comments, setComments] = useState([]);
  const [playTime, setPlayTime] = useState(0);            // Sadece giriş yapan kullanıcının oynadığı süre
  const [totalPlayTime, setTotalPlayTime] = useState(0);   // Tüm kullanıcıların toplam oyun süresi
  const [timer, setTimer] = useState(null);
  const [ratingValue, setRatingValue] = useState(5);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (games.length > 0) {
      const foundGame = games.find(g => g._id === parseInt(id));
      if (foundGame) {
        setGame(foundGame);
      }
    }
  }, [games, id]);

  useEffect(() => {
    if (game && users.length > 0) {
      // Yorumları güncelle
      const updatedComments = users
        .map(user => {
          const g = user.games?.find(g => g.gameId === game._id);
          if (g && g.comment) {
            return {
              username: user.username,
              avatar: user.avatar,
              comment: g.comment,
              rating: g.rating,
              playTime: g.playTime
            };
          }
          return null;
        })
        .filter(c => c !== null);

      setComments(updatedComments);

      // Tüm kullanıcıların toplam oyun süresini hesapla
      const totalTime = users.reduce((acc, user) => {
        const userGame = user.games?.find(g => g.gameId === game._id);
        return acc + (userGame ? userGame.playTime : 0);
      }, 0);

      setTotalPlayTime(totalTime);

      // Şu anki kullanıcının kendi oynama süresi
      if (currentUser) {
        const currentUserData = users.find(u => u.username === currentUser.username);
        const currentGame = currentUserData?.games?.find(g => g.gameId === game._id);
        setPlayTime(currentGame ? currentGame.playTime : 0);
      }
    }
  }, [game, users, currentUser]);

  const handlePlay = () => {
    if (timer) return;
    const newTimer = setInterval(() => {
      setPlayTime(prev => prev + 1); // 1 saniye = 1 saat gibi
    }, 1000);
    setTimer(newTimer);
  };

  const handleStop = () => {
    clearInterval(timer);
    setTimer(null);

    if (currentUser) {
      setUsers(prevUsers =>
        prevUsers.map(u => {
          if (u.username === currentUser.username) {
            const hasGame = u.games.some(g => g.gameId === game._id);

            const updatedGames = hasGame
              ? u.games.map(g => g.gameId === game._id ? { ...g, playTime } : g)
              : [...u.games, { gameId: game._id, playTime, rating: 0, comment: '' }];

            return { ...u, games: updatedGames };
          }
          return u;
        })
      );
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!currentUser || !commentText.trim()) return;

    const newComment = {
      username: currentUser.username,
      avatar: currentUser.avatar,
      comment: commentText.trim(),
      rating: ratingValue,
      playTime
    };

    setUsers(prevUsers =>
      prevUsers.map(u => {
        if (u.username === currentUser.username) {
          const hasGame = u.games.some(g => g.gameId === game._id);

          const updatedGames = hasGame
            ? u.games.map(g => g.gameId === game._id
              ? { ...g, rating: ratingValue, comment: commentText.trim(), playTime }
              : g)
            : [...u.games, { gameId: game._id, playTime, rating: ratingValue, comment: commentText.trim() }];

          return { ...u, games: updatedGames };
        }
        return u;
      })
    );

    setComments(prev => [newComment, ...prev]);
    setCommentText('');
    setRatingValue(5);
  };

  if (!game) return <div className="loading">Loading...</div>;

  return (
    <div className="game-detail-container">
      <button className="back-button" onClick={() => navigate("/")}>
        <i className="bi bi-arrow-left"></i> Back to Home
      </button>

      <div className="game-card">
        <img src={game.img} alt={game.title} className="game-image" />
        <div className="game-info">
          <h1 className="game-title">{game.title}</h1>
          <p className="game-desc">
            Level: <span className={`badge ${game.level.toLowerCase()}`}>{game.level}</span>
          </p>
          <p className="game-price">Price: ${game.price}</p>

          {currentUser && (
            <>
              {!timer ? (
                <button className="play-button" onClick={handlePlay}>
                  Play Now
                </button>
              ) : (
                <button className="stop-button" onClick={handleStop}>
                  Stop Playing
                </button>
              )}
            </>
          )}
        </div>

        <div className="info-box">
          <h3>About This Game</h3>
          <p>{game.description}</p>
          <p><strong>Developer:</strong> {game.developer}</p>
          <p><strong>Release Year:</strong> {game.releaseYear}</p>
          <p><strong>Total Play Time of Users:</strong> {totalPlayTime}h</p>
        </div>

        {!game.disableRating && (
          <div className="rating-comments-container">
            <h4>Rating: {comments.length > 0 ? (comments.reduce((acc, c) => acc + c.rating, 0) / comments.length).toFixed(1) : 'No ratings yet'} / 5</h4>
            <h3>All Comments</h3>
            <ul className="comment-list">
              {comments.map((comment, index) => (
                <li key={index}>
                  <strong>{comment.username}</strong> ({comment.playTime}h, Rating: {comment.rating}): {comment.comment}
                </li>
              ))}
            </ul>

            {currentUser && (
              <form onSubmit={handleCommentSubmit} className="add-comment-form">
                <select value={ratingValue} onChange={(e) => setRatingValue(parseInt(e.target.value))}>
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Good</option>
                  <option value={3}>3 - Average</option>
                  <option value={2}>2 - Bad</option>
                  <option value={1}>1 - Terrible</option>
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
