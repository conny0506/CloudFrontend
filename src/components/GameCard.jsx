import React, { useContext } from 'react';
import './gameCard.css';
import GameRating from './GameRating';
import { AppContext } from '../App';

function GameCard({ game }) {
  const { library, setLibrary, bag, setBag, currentUser } = useContext(AppContext);

  const handleAddToLibrary = () => {
    if (!currentUser) {
      alert("Please log in to add to your Library!");
      return;
    }
    setLibrary([...library, game]);
  };

  const handleRemoveFromLibrary = () => {
    setLibrary(library.filter(item => item.id !== game.id));
  };

  const handleAddToBag = () => {
    if (!currentUser) {
      alert("Please log in to add to your Bag!");
      return;
    }
    if (bag.find(g => g.id === game.id)) return;
    setBag([...bag, game]);
  };

  return (
    <div className="col-xl-3 col-lg-4 col-md-6">
      <div className="gameCard">
        <a href={`/game/${game.id}`}>
          <img src={game.img || '/assets/placeholder.jpg'} alt={game.name} className='img-fluid' />
        </a>
        <a href="#"
           className={`like ${library.some(g => g.id === game.id) ? 'active' : undefined}`}
           onClick={library.some(g => g.id === game.id) ? handleRemoveFromLibrary : handleAddToLibrary}>
          <i className="bi bi-heart-fill"></i>
        </a>
        <div className="gameFeature">
          <span className="gameType">{game.genre || 'Unknown'}</span>
          <GameRating rating={game.averageRating || 0} />
        </div>
        <div className="gameTitle mt-4 mb-2">{game.name || 'Untitled Game'}</div>

        {/* ✅ Yeni: Açıklama */}
        <div className="gameDescription  small mb-2">
          {game.description?.length > 100
            ? `${game.description.slice(0, 100)}...`
            : game.description || 'No description.'}
        </div>

        <div className="gamePrice">
          <span className="currentPrice">
            {game.totalPlayTime > 0 ? `${game.totalPlayTime}h played` : 'Just Released'}
          </span>
        </div>
        <a href="#" className="addBag" onClick={handleAddToBag}>
          <i className="bi bi-bag-plus-fill"></i>
        </a>
      </div>
    </div>
  );
}

export default GameCard;
