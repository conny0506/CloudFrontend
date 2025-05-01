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
    if (bag.includes(game)) return;
    setBag([...bag, game]);
  };

  // Güvenli değerler
  const name = game.name || 'Untitled Game';
  const img = game.img || '/images/default.jpg';
  const price = typeof game.price === 'number' ? game.price : 0;
  const discount = typeof game.discount === 'number' ? game.discount : 0;
  const discountedPrice = (1 - discount) * price;
  const rating = typeof game.averageRating === 'number' ? game.averageRating : 0;

  return (
    <div className="col-xl-3 col-lg-4 col-md-6">
      <div className="gameCard">
        <a href={`/game/${game.id}`}>
          <img src={img} alt={name} className="img-fluid" />
        </a>
        <a
          href="#"
          className={`like ${library.some(item => item.id === game.id) ? 'active' : ''}`}
          onClick={
            library.some(item => item.id === game.id)
              ? handleRemoveFromLibrary
              : handleAddToLibrary
          }
        >
          <i className="bi bi-heart-fill"></i>
        </a>
        <div className="gameFeature">
          <span className="gameType">{game.genre || 'Unknown'}</span>
          <GameRating rating={rating} />
        </div>
        <div className="gameTitle mt-4 mb-3">{name}</div>
        <div className="gamePrice">
          {discount > 0 && (
            <>
              <span className="discount">
                <i>{(discount * 100).toFixed(0)}%</i>
              </span>
              <span className="prevPrice">${price.toFixed(2)}</span>
            </>
          )}
          <span className="currentPrice">${discountedPrice.toFixed(2)}</span>
        </div>
        <a href="#" className="addBag" onClick={handleAddToBag}>
          <i className="bi bi-bag-plus-fill"></i>
        </a>
      </div>
    </div>
  );
}

export default GameCard;
