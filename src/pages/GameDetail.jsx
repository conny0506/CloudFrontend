import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import './gameDetail.css';

function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AppContext);

  const [game, setGame] = useState(null);
  const [updatedUsers, setUpdatedUsers] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch('/api/gamesData.json')
      .then(res => res.json())
      .then(data => {
        const foundGame = data.find(game => game._id === parseInt(id));
        if (foundGame) {
          setGame(foundGame);
          setUpdatedUsers(foundGame.users);
        }
      })
      .catch(err => console.log('Error fetching game details:', err));
  }, [id]);

  const handlePlayNow = () => {
    if (!currentUser) {
      alert('Please log in to play!');
      return;
    }

    const interval = setInterval(() => {
      setUpdatedUsers(prev => prev.map(user => {
        if (user.name === currentUser.username) {
          return { ...user, playTime: user.playTime + 1 };
        }
        return user;
      }));
    }, 1000); // her saniye 1 saat

    setTimerId(interval);
    setIsPlaying(true);
  };

  const handleStopPlaying = () => {
    clearInterval(timerId);
    setIsPlaying(false);
  };

  const handleAddComment = () => {
    if (!currentUser) {
      alert('Please log in to add a comment!');
      return;
    }

    const newUserComment = {
      name: currentUser.username,
      playTime: 0,
      rating: newRating,
      comment: newComment
    };

    setUpdatedUsers(prev => [...prev, newUserComment]);
    setNewRating(5);
    setNewComment('');
  };

  if (!game) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="game-detail-container">
      <div className="game-card">
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate("/")}>
          <i className="bi bi-arrow-left"></i> Back to Home
        </button>

        {/* Main Game Info */}
        <img src={game.img} alt={game.title} className="game-image" />
        <div className="game-info">
          <h1 className="game-title">{game.title}</h1>
          <p className="game-desc">
            Level: <span className={`badge ${game.level.toLowerCase()}`}>{game.level}</span>
          </p>
          <p className="game-price">Price: ${game.price}</p>

          {currentUser && (
            <>
              {!isPlaying ? (
                <button className="play-button" onClick={handlePlayNow}>
                  Play Now
                </button>
              ) : (
                <button className="stop-button" onClick={handleStopPlaying}>
                  Stop
                </button>
              )}
            </>
          )}
        </div>

        {/* About This Game */}
        <div className="info-box">
          <h3>ABOUT THIS GAME</h3>
          <p>{game.description}</p>
          <p><strong>Developer:</strong> {game.developer}</p>
          <p><strong>Release Year:</strong> {game.releaseYear}</p>
          <p><strong>Total Play Time of Users:</strong> {updatedUsers.reduce((acc, user) => acc + user.playTime, 0)} hours</p>
        </div>

        {/* Rating & Comments */}
        <div className={`rating-comments-container ${game.disableRating ? 'hide' : ''}`}>
          <h4>Rating: {game.rating} / 5</h4>
          <h3>All Comments</h3>

          {currentUser && (
            <div className="add-comment-form">
              <select value={newRating} onChange={(e) => setNewRating(parseInt(e.target.value))}>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <textarea
                placeholder="Write your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button onClick={handleAddComment}>Add Comment</button>
            </div>
          )}

          <ul className="comment-list">
            {updatedUsers.map((user, index) => (
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
