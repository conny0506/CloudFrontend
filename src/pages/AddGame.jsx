import React, { useState } from 'react';
import './addGame.css';

function AddGame({ games, reference, addGame }) {
  const [newGame, setNewGame] = useState({
    name: '',
    genres: '',
    category: '',
    photo: '',
    releaseDate: '',
    developer: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGame(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGameData = {
      rating: 0,
      _id: games.length + 1,
      title: newGame.name,
      genres: newGame.genres.split(',').map(genre => genre.trim()),
      category: newGame.category,
      img: newGame.photo,
      releaseYear: new Date(newGame.releaseDate).getFullYear(),
      developer: newGame.developer,
      level: "Easy", 
      rating: 0,
      discount: 0,
      price: 0,
      users: [],
      playTime: 0
    };

    addGame(newGameData);

    setNewGame({
      name: '',
      genres: '',
      category: '',
      photo: '',
      releaseDate: '',
      developer: ''
    });
  };

  return (
    <section id="addG" className="addG" ref={reference}>
      <div className="container-fluid">
        <h1>Add Game</h1>
        <form className="add-game-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Game Name</label>
            <input 
              type="text" 
              name="name" 
              value={newGame.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Genres (virgülle ayır)</label>
            <input 
              type="text" 
              name="genres" 
              value={newGame.genres} 
              onChange={handleChange} 
              placeholder="Örn: RPG, Action, Adventure"
              required 
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input 
              type="text" 
              name="category" 
              value={newGame.category} 
              onChange={handleChange} 
              placeholder="Örn: RPG, MOBA"
              required 
            />
          </div>

          <div className="form-group">
            <label>Photo URL</label>
            <input 
              type="text" 
              name="photo" 
              value={newGame.photo} 
              onChange={handleChange} 
              placeholder="https://..." 
              required 
            />
          </div>

          <div className="form-group">
            <label>Release Date</label>
            <input 
              type="date" 
              name="releaseDate" 
              value={newGame.releaseDate} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Developer Name</label>
            <input 
              type="text" 
              name="developer" 
              value={newGame.developer} 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="submit-button">
            Add Game
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddGame;
