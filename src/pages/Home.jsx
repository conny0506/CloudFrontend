import React from 'react';
import GameCard from '../components/GameCard';


function Home({ games, reference }) {
  return (
    <section className="home" ref={reference}>
      <div className="container">
        <h1>All Games</h1>
        <div className="row game-list">
          {games && games.length > 0 ? (
            games.map(game => (
              <GameCard key={game.id} game={game} />
            ))
          ) : (
            <p>No games available.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
