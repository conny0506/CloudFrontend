import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import './viewProfile.css';

function ViewProfile({ reference }) {
  const { currentUser, games, users } = useContext(AppContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const user = users.find(u => u.username === currentUser.username);
      setUserInfo(user);
    }
  }, [currentUser, users]);

  if (!currentUser || !userInfo) {
    return (
      <section id="viewProfile" className="viewProfile" ref={reference}>
        <h1>Unauthorized Access</h1>
      </section>
    );
  }

  const totalPlayTime = userInfo.games.reduce((acc, game) => acc + game.playTime, 0);
  const averageRating = (userInfo.games.reduce((acc, game) => acc + game.rating, 0) / userInfo.games.length).toFixed(2);
  const mostPlayed = userInfo.games.reduce((prev, current) => (prev.playTime > current.playTime) ? prev : current, {});

  const sortedGames = [...userInfo.games].sort((a, b) => b.playTime - a.playTime);

  return (
    <section id="viewProfile" className="viewProfile" ref={reference}>
      <div className="profile-card">
        <img src={userInfo.avatar} alt="Profile" className="profile-avatar" />
        <h1>{currentUser.username}</h1>

        <div className="profile-info">
          <p><strong>Total Play Time:</strong> {totalPlayTime} hours</p>
          <p><strong>Average Rating:</strong> {averageRating}</p>
          <p><strong>Most Played Game:</strong> {
            (() => {
              const relatedGame = games.find(game => game._id === mostPlayed.gameId);
              return relatedGame ? relatedGame.title : "N/A";
            })()
          }</p>
        </div>

        <h2>Comments:</h2>
        <div className="comments-table">
          <table>
            <thead>
              <tr>
                <th>Game</th>
                <th>Play Time</th>
                <th>Rating</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {sortedGames.map((g, index) => {
                const relatedGame = games.find(game => game._id === g.gameId);
                return (
                  <tr key={index}>
                    <td>{relatedGame ? relatedGame.title : "Unknown Game"}</td>
                    <td>{g.playTime}h</td>
                    <td>{g.rating}</td>
                    <td>{g.comment}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ViewProfile;
