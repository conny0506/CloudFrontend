import React, { useContext } from 'react';
import { AppContext } from '../App';
import './viewProfile.css';

function ViewProfile({ reference }) {
  const { currentUser, games } = useContext(AppContext);

  if (!currentUser) {
    return (
      <section id="viewProfile" className="viewProfile" ref={reference}>
        <h1>Unauthorized Access</h1>
      </section>
    );
  }

  // 🔍 Sadece yorum yaptığı oyunları filtreliyoruz
  const userGames = games
    .map(game => {
      const play = game.playedUsers?.find(u => u.userId === currentUser.id);
      const comment = game.comments?.find(c => c.userId === currentUser.id);
      const ratingObj = game.ratings?.find(r => r.userId === currentUser.id);

      // ✅ Yalnızca yorum yapılmış oyunlar dahil edilecek
      if (play && comment) {
        return {
          gameId: game.id,
          name: game.name,
          minutes: play.minutes || 0,
          rating: ratingObj?.rating ?? '—',
          comment: comment?.content ?? '—'
        };
      }

      return null;
    })
    .filter(Boolean)
    .sort((a, b) => b.minutes - a.minutes); // çoktan aza sıralama

  // ⏱ Toplam süre
  const totalMinutes = userGames.reduce((acc, g) => acc + g.minutes, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;

  // ⭐ Ortalama puan
  const ratedGames = userGames.filter(g => typeof g.rating === 'number');
  const averageRating =
    ratedGames.length > 0
      ? (ratedGames.reduce((acc, g) => acc + g.rating, 0) / ratedGames.length).toFixed(2)
      : 'N/A';

  // 🏆 En çok oynanan oyun
  const mostPlayed = userGames.length > 0
    ? userGames.reduce((prev, curr) => (prev.minutes > curr.minutes ? prev : curr))
    : null;

  return (
    <section id="viewProfile" className="viewProfile" ref={reference}>
      <div className="profile-card">
        <img src={currentUser.avatarUrl || '/assets/default-avatar.jpg'} alt="Profile" className="profile-avatar" />
        <h1>{currentUser.username}</h1>

        <div className="profile-info">
          <p><strong>Total Play Time:</strong> {totalHours}h {totalMins}min</p>
          <p><strong>Average Rating:</strong> {averageRating}</p>
          <p><strong>Most Played Game:</strong> {mostPlayed?.name || "N/A"}</p>
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
              {userGames.map((g, index) => {
                const gHours = Math.floor(g.minutes / 60);
                const gMins = g.minutes % 60;

                return (
                  <tr key={index}>
                    <td>{g.name}</td>
                    <td>{gHours}h {gMins}min</td>
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
