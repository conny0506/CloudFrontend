import React, { useContext } from 'react'
import './gameCard.css'
import GameRating from './GameRating'
import { AppContext } from '../App'

function GameCard({ game }) {
  const { library, setLibrary, bag, setBag, currentUser } = useContext(AppContext)

  const handleAddToLibrary = () => {
    if (!currentUser) {
      alert("Please log in to add to your Library!");
      return;
    }
    setLibrary([...library, game])
  }

  const handleRemoveFromLibrary = () => {
    setLibrary(library.filter(item => item._id !== game._id))
  }

  const handleAddToBag = () => {
    if (!currentUser) {
      alert("Please log in to add to your Bag!");
      return;
    }
    if (bag.includes(game)) return
    setBag([...bag, game])
  }

  return (
    <div className="col-xl-3 col-lg-4 col-md-6">
      <div className="gameCard">
        <a href={`/game/${game._id}`}>
          <img src={game.img} alt={game.title} className='img-fluid' />
        </a>
        <a href="#" className={`like ${library.includes(game) ? 'active' : undefined}`}
           onClick={library.includes(game) ? handleRemoveFromLibrary : handleAddToLibrary}>
          <i className="bi bi-heart-fill"></i>
        </a>
        <div className="gameFeature">
          <span className="gameType">{game.level}</span>
          <GameRating rating={game.rating} />
        </div>
        <div className="gameTitle mt-4 mb-3">{game.title}</div>
        <div className="gamePrice">
          {game.discount !== 0 && (
            <>
              <span className="discount">
                <i>{game.discount * 100}%</i>
              </span>
              <span className="prevPrice">${game.price.toFixed(2)}</span>
            </>
          )}
          <span className="currentPrice">${((1 - game.discount) * game.price).toFixed(2)}</span>
        </div>
        <a href="#" className="addBag" onClick={handleAddToBag}>
          <i className="bi bi-bag-plus-fill"></i>
        </a>
      </div>
    </div>
  )
}

export default GameCard
